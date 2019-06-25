const router = require("express-promise-router")();
const { validateBody, schemas } = require("../helpers/routeHelpers");
const UsersController = require("../controllers/users");
const passport = require("passport");
const passportConf = require("../passport");
router
  .route("/signup")
  .post(validateBody(schemas.authSchema), UsersController.signUp);
router.route("/signin").post(UsersController.signIn);

router
  .route("/secret")
  .get(
    passport.authenticate("jwt", { session: false }),
    UsersController.secret
  );
module.exports = router;
