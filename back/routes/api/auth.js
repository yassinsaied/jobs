const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const { check, validationResult } = require("express-validator");

// Get private Key fo token
const privateKey = fs.readFileSync("jwt/jwtRS256.key", "utf8");

// router.get('/', auth, async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.user.email }).select('-password');
//     res.json(user);
//   } catch (error) {
//     console.log(error);
//   }
//   //   res.send('auth route');
// });

// @route GET api/auth
// @desc  TEST route
// @access Public

router.post(
  "/",
  // Validation Request
  [
    check("email")
      .isEmail()
      .withMessage("Email Invalid")
      .not()
      .isEmpty()
      .withMessage("Email is required"),
    check("password")
      .notEmpty()
      .withMessage("Password  is required")
      .isLength({ min: 5 })
      .withMessage("Password min char 5"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exist
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json("Invalid credentials");
      }

      // verify password match

      const isMatch = bcrypt.compareSync(password, user.password);

      // return JsonWebToken

      const payloadToken = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        },
      };
      if (isMatch) {
        jwt.sign(
          payloadToken,
          privateKey,
          { algorithm: "RS512", expiresIn: "12h" },
          (err, token) => {
            if (err) throw err;
            delete payloadToken.user.id;
            user = payloadToken.user;

            res.json({ token, user });
          }
        );
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server Error");
    }
  }
);

module.exports = router;
