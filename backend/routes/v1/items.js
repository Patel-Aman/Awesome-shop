import express 			from 'express';
import AuthMiddleWare   from '../../middleware/AuthMiddleware.js';
import * as Item        from '../../models/items.js';
import * as User        from '../../models/user.js'

const router = express.Router();

const response = data => ({message: data});


router.get('/:id', AuthMiddleWare ,async (req, res) => {
    const user = req.body.username;
    const id = req.params.id;

    return Item.getItemById(user, id)
        .then(items => res.send(items))
        .catch((e) => res.send(response('Something Went Wrong')));
});

router.get('/search', AuthMiddleWare, async (req, res) => {
    const name = req.params.name;
    return Item.search(name)
        .then(items => res.send(items))
        .catch((e) => res.send(response('Something Went Wrong')))
})
router.post('/addItem', AuthMiddleWare,async (req, res) => {
    const newItem = req.body;
    return User.getUser(req.data.username)
        .then(user => {
            if(user === null) return res.redirect('/');
            return Item.addItem(user, newItem)
                .then(() => res.send(response('Item added Successfully')))
        }).catch(() => {
            res.send(response('Something Went Wrong'));
        })
})

export default router;