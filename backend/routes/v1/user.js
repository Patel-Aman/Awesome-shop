import express 			from 'express';
import path             from "path";
import AuthMiddleWare   from '../../middleware/AuthMiddleware.js';
import  uploader        from "../../helpers/uploadHelper.js";
import * as User        from '../../models/user.js';

const router = express.Router();

const response = data => ({ message: data });


router.get('/', async (req, res) => {
    res.send(response('well done'));
});


router.get('/avatar/', AuthMiddleWare, async (req, res) => {
    return User.getUser(req.data.username)
        .then(user => {
            if (user === null) return res.redirect('/');
            let avatar = path.join(process.cwd(), 'uploads/', user.public.avatar);
            res.sendFile(avatar);
        })
})

router.post('/avatar', AuthMiddleWare ,async (req, res) =>{
    return User.getUser(req.data.username)
        .then(user => {
            if (user === null) return res.redirect('/');
            return uploader(req, res, (err) => {
                if(err) res.send(err);
                else res.send(response("Uploaded Successfully"));
            })
        })
        .catch(err => res.status(500).send(response(err.message)));
})

router.get('/profile', AuthMiddleWare, async (req, res) => {
    return User.getUser(req.data.username)
        .then(user => {
            if(user === null) return res.redirect('/');
            return res.send({...user.public, ...user.details})
        })
        .catch(()  => { res.send(response('Something Went Wrong'))});
})

router.get('/profile/:username', async (req, res) => {
    return User.getUser(req.params.username)
        .then(user => {res.send(user.public)})
        .catch(() => {res.send(response('Something Went Wrong'))})
})

router.post('/profile', AuthMiddleWare, async (req, res) => {
    const userDetails = req.body;
    return User.getUser(req.data.username)
        .then(user => {
            if(user === null) return res.redirect('/');
            return User.addDetails(user, userDetails)
                .then(() => res.send(response('user details added')));
        }).catch(()  => {
            res.send(response('Something Went Wrong'))
        });
})


// ES6 export
export default router;