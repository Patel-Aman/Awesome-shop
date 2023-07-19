import express 			from 'express';
const router         = express.Router();
import { JWTHelper }        from '../../helpers/JWTHelper.js';
import  crypto  from 'crypto';

let db;

const response = data => ({ message: data });


router.get('/', async (req, res) => {
    res.send(response('well done'));
});

router.post('/register', async (req, res) => {
    const {username, password, email, full_name} = req.body;

    if (username && password && email && full_name) {
        const hashpassword = crypto.createHash('sha256').update(password).digest('hex');
        return db.checkUser(username)
            .then(user => {
                if (user) return res.status(401).send(response('User already registered!'));
                return db.registerUser(username, hashpassword, email, full_name)
                    .then(() => res.send(response('User Registered Successfully!')))
            })
            .catch(() => res.send(response('Something Went Wrong!')));
    }
    return res.status(401).send(response('Username and Password required!'));
});



router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    if (username && password){
        return db.loginUser(username, hashedPassword)
            .then(user => {
                let token = JWTHelper.sign({username: user.username });
                res.cookie('session', token, {maxAge: 3600000, httpOnly: true});
                return res.redirect('/user')
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
const authrouter = (database) => {
    db = database;
    return router;
};
  
export { authrouter };
  
// module.exports = database => { 
// 	db = database;
// 	return router;
// };