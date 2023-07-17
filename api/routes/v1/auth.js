const express        = require('express');
const router         = express.Router();
const JWTHelper      = require('../../helpers/JWTHelper');

let db;

const response = data => ({ message: data });


router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    if (username && password) {
        return db.checkUser(username)
            .then(user => {
                if (user) return res.status(401).send(response('User already registered!'));
                return db.registerUser(username, password)
                    .then(() => res.send(response('User Registered Successfully!')))
            })
            .catch(() => res.send(response('Something Went Wrong!')));
    }
    return res.status(401).send(response('Username and Password required!'));
});



router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    if (username && password){
        return db.loginUser(username, password)
            .then(user => {
                let token = JWTHelper.sign({username: user.username });
                res.cookie('session', token, {maxAge: 3600000, httpOnly: True});
                return res.send(redirect('/user'))
            })
            .catch(() => res.status(403).send(response('Invalid Username or Password')));
    }
    return res.status(500).send(response('Missing Paramertes'));
});

router.get('/logout', (req, res) => {
	res.clearCookie('session');
	return res.redirect('/');
});

module.exports = database => { 
	db = database;
	return router;
};