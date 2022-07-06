const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
router.get("/register", (req, res) => {
  res.render("registration");
});
router.get("/update-form", (req, res) => {
  res.render("update-form");
});

router.get("/updateStudent", (req, res) => {
  res.render("updateStudent");
});
module.exports = router;
