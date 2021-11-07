const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//register

router.post('/register', async (req, res) => {
  try {
    //genarate neww pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save and send res
    const user = await newUser.save();
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json('failed to create user');
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json(' incorrect username or password ');
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      //validate password
      if (!validPassword) {
        res.status(400).json('incorrect username or password ');
      } else {
        res.status(200).json({ _id: user._id, username: user.username });
      }
    }

    //send res
  } catch (error) {
    res.status(500).json('failed to login');
  }
});

module.exports = router;
