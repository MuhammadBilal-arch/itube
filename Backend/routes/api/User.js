const express = require("express");
const router = express.Router();

//User Model
const Users = require("../../models/userModel");

// @route Get api/users
router.get("/", (req, res) => {
  Users.find().then((user) => res.json(user));
});

router.post("/", (req, res) => {
  const newUser = new User({
    Name: req.body.Name,
    Password: req.body.Password,
    PhoneNo: req.body.PhoneNo,
  });

  newUser.save().then((user) => res.json(user));
});

router.get("/getuser/:user", (req, res) => {
  const UserName = req.params.user;
  console.log(UserName);
  Users.findOne({ Name: UserName }).then((user) => res.json(user));
});

router.delete("/:user", (req, res) => {
  const UserName = req.params.user;
  Users.findOneAndRemove({ Name: UserName }).then((user) => res.json(user));
});

module.exports = router;
