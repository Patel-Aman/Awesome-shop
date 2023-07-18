import express 			from 'express';
const router         = express.Router();
import { JWTHelper }        from '../../helpers/JWTHelper.js';

let db;

const response = data => ({ message: data });


router.get('/', async (req, res) => {
    res.send(response('well done'));
});

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



// ES6 export
const authrouter = (database) => {
    db = database;
    return router;
};
  
export { authrouter };
  
// module.exports = database => { 
// 	db = database;
// 	return router;
// };