module.exports = {
  signUp: async (req, res, next) => {
    // req.value.body
    console.log("req.value.body", req.value.body);
    console.log("Userscontroller.signUp() called");
  },
  signIn: async (req, res, next) => {
    console.log("Userscontroller.signIn() called");
  },
  secret: async (req, res, next) => {
    console.log("Userscontroller.secret() called");
  }
};
