const express = require("express");
const {  checkRole, checkSubRole, authUser } = require("../middleWeres/authMiddleWere");

const router = express.Router();

// Admin only route
router.get("/admin-dashboard", authUser, checkRole(["admin"]), (req, res) => {
    res.json({ msg: "Welcome Admin", user: req.authanticatedUser });
});

// Staff members only
router.get("/staff-dashboard", authUser, checkRole(["staff"]), (req, res) => {
    res.json({ msg: "Welcome Staff", user: req.authanticatedUser });
});

// Specific staff roles (e.g., Only Managers)
router.get("/manager-section", authUser, checkRole(["staff"]), checkSubRole(["manager"]), (req, res) => {
    res.json({ msg: "Welcome Manager", user: req.authanticatedUser });
});

// Receptionists only
router.get("/receptionist-section", authUser, checkRole(["staff"]), checkSubRole(["receptionist"]), (req, res) => {
    res.json({ msg: "Welcome Receptionist", user: req.authanticatedUser });
});

// Guest user route
router.get("/guest-dashboard", authUser, checkRole(["guest"]), (req, res) => {
    res.json({ msg: "Welcome Guest", user: req.authanticatedUser });
});

module.exports = router;
