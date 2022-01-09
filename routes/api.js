const express = require("express");
const router = express.Router();
const userRoutes = require("../routes/users");
const workingGroupRoutes = require("../routes/workinggroups");

router.use("/users", userRoutes);
router.use("/workinggroups", workingGroupRoutes);

module.exports = router;
