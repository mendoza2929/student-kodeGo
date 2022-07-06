const express = require("express");
const router = express.Router();
const regController = require("../controllers/authAccount");

router.post("/login", regController.login);
router.post("/register", regController.register);
router.get("/update-form/:email", regController.update);
router.get("/delete/:email", regController.delete);
router.post("/updateStudent", regController.updateStudent);
router.get("/logout", (req, res) => {
  res.render("index");
});
module.exports = router;
