const express = require("express");
const router = express.Router();
const WorkingGroup = require("../models/workinggroup");

router.get("/", (req, res, next) => {
  WorkingGroup.find({}).then((data) => res.send(data));
});

router.post("/", (req, res, next) => {});

router.put("/", (req, res, next) => {});

module.exports = router;
