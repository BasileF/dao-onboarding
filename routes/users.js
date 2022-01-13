const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res, next) => {
  const publicAddress = req.query.publicAddress;
  if (publicAddress) {
    User.find({ publicAddress }).then((data) => res.json(data));
  } else {
    User.find({}).then((data) => res.json(data));
  }
});

router.post("/", (req, res, next) => {
  User.create(req.body).then((user) => res.json(user));
});

router.put("/", (req, res, next) => {});

module.exports = router;
