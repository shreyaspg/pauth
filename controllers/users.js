const User = require("../models/user");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../configuration/index");

signToken = user => {
  return (token = JWT.sign(
    {
      iss: "issuerName",
      sub: user._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    JWT_SECRET
  ));
};

module.exports = {
  signUp: async (req, res, next) => {
    // req.value.body
    // console.log("req.value.body", req.value.body);
    console.log("Userscontroller.signUp() called");

    const { email, password } = req.value.body;

    // Check for existing user
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).send({ error: "User already exits" });
    }

    // If not create a new User
    const newUser = new User({
      email,
      password
    });
    await newUser.save();

    // Respond with a Token
    const token = signToken(newUser);
    res.status(200).json({ token });
  },
  signIn: async (req, res, next) => {
    console.log("Successful login");
    // generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  secret: async (req, res, next) => {
    console.log("Managed to get here");
  }
};
