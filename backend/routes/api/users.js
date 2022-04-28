const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
        console.log('>>>>', email, password, username);
      const user = await User.signup({ email, username, password });
        console.log('+++++', user);

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    })
  );

module.exports = router;
