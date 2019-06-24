const User = require("../models/user");
module.exports = {
  signUp: async (req, res, next) => {
    // req.value.body
    // console.log("req.value.body", req.value.body);
    console.log("Userscontroller.signUp() called");
    // const email = req.value.body.email;
    // const password = req.value.body.password;
    const { email, password } = req.value.body;

    // Check for existing user
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).send({ error: "User already exits" });
    }
    const newUser = new User({
      email,
      password
    });
    await newUser.save();
    res.json({ user: "created" });
  },
  signIn: async (req, res, next) => {
    console.log("Userscontroller.signIn() called");
  },
  secret: async (req, res, next) => {
    console.log("Userscontroller.secret() called");
  }
};
