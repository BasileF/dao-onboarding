const recoverPersonalSignature =
  require("eth-sig-util").recoverPersonalSignature;
const bufferToHex = require("ethereumjs-util").bufferToHex;
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  const { publicAddress, signature } = req.body;
  if (!signature || !publicAddress) {
    return res
      .status(400)
      .json({ error: "Requires public address and signature" });
  }
  return User.findOne({ publicAddress })
    .then((user) => {
      if (!user) {
        res.status(401).send({
          error: `User with publicAddress ${publicAddress} is not found in database`,
        });

        return null;
      }

      return user;
    })
    .then((user) => {
      if (!(user instanceof User)) {
        throw new Error('User is not defined in "Verify digital signature".');
      }

      const msg = `I am signing my one-time nonce: ${user.nonce}`;

      const msgBufferHex = bufferToHex(Buffer.from(msg, "utf8"));
      const address = recoverPersonalSignature({
        data: msgBufferHex,
        sig: signature,
      });

      if (address.toLowerCase() === publicAddress.toLowerCase()) {
        return user;
      } else {
        res.status(401).send({
          error: "Signature verification failed",
        });

        return null;
      }
    })
    .then((user) => {
      if (!(user instanceof User)) {
        throw new Error(
          'User is not defined in "Generate a new nonce for the user".'
        );
      }

      user.nonce = Math.floor(Math.random() * 10000);
      return user.save();
    })
    .then((user) => {
      return new Promise((resolve, reject) =>
        jwt.sign(
          {
            payload: {
              id: user.id,
              publicAddress,
            },
          },
          "MYSECRET",
          {
            algorithm: "HS256",
          },
          (err, token) => {
            if (err) {
              return reject(err);
            }
            if (!token) {
              return new Error("Empty token");
            }
            return resolve(token);
          }
        )
      );
    })
    .then((accessToken) => res.json({ accessToken }))
    .catch(next);
});

module.exports = router;
