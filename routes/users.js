const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res, next) => {
  User.find({}).then((data) => res.send(data));
});

router.post("/", (req, res, next) => {});

router.put("/", (req, res, next) => {});

module.exports = router;
