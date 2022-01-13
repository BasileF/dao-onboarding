const express = require("express");
const router = express.Router();
const authRoutes = require("../routes/auth");
const userRoutes = require("../routes/users");
const workingGroupRoutes = require("../routes/workinggroups");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/workinggroups", workingGroupRoutes);

module.exports = router;
