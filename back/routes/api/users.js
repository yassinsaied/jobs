const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// Get private Key fo token
const privateKey = fs.readFileSync('jwt/jwtRS256.key', 'utf8');

// @route GET api/users
// @desc  Register User
// @access Public

router.post(
  '/',
  // Validation Request
  [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Email Invalid').not().isEmpty().withMessage('Email is required'),
    check('password')
      .notEmpty()
      .withMessage('Password  is required')
      .isLength({ min: 5 })
      .withMessage('Password min char 5'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exist
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json('User already existe');
      }

      //Get user gravatar

      const avatar = gravatar.url({
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // create user

      user = new User({
        name: name,
        email: email,
        password: password,
        avatar: avatar,
      });

      // Encrypt password

      const salt = bcrypt.genSaltSync(5);
      user.password = bcrypt.hashSync(password, salt);

      // Registred user
      await user.save();

      // return JsonWebToken
      const payloadToken = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };

      jwt.sign(payloadToken, privateKey, { algorithm: 'RS512', expiresIn: '12h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      return res.status(500).json('Server Error');
    }
  }
);

module.exports = router;
