import express from 'express';
import crypto from 'crypto';
import JWTHelper from '../../helpers/JWTHelper.js';
import * as User from '../../models/user.js';

const router = express.Router();

const response = (data) => ({ message: data });

router.get('/', async (req, res) => {
  res.send(response('well done'));
});

router.post('/register', async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  if (username && password && email && firstName && lastName) {
    const fullName = firstName + ' ' + lastName;
    const hashPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
    return await User.getUser(username)
      .then((user) => {
        if (user)
          return res.status(401).send(response('User already registered!'));
        return User.registerUser(username, hashPassword, email, fullName).then(
          () => res.send(response('User Registered Successfully!')),
        );
      })
      .catch(() => res.send(response('Something Went Wrong!')));
  }
  return res.status(401).send(response('Username and Password required!'));
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');

  if (username && password) {
    return User.loginUser(username, hashedPassword)
      .then((user) => {
        let token = JWTHelper.sign({ username: user.username });
        res.cookie('session', token, { maxAge: 3600000, httpOnly: true });
        // return res.redirect('/user')
        res.send(response('Logged in successfully'));
      })
      .catch((e) => {
        console.log(e);
        res.status(403).send(response('Invalid Username or Password'));
      });
  }
  return res.status(500).send(response('Missing Paramertes'));
});

router.get('/logout', (req, res) => {
  res.clearCookie('session');
  return res.redirect('/');
});

// ES6 export
export default router;
