import express from 'express';
import User from '../../Models/user.js';
import login from '../../Models/login.js';
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', async (req, res) => {
    res.send(req.body);
    // make sure the email doesn't already exist
});


router.post('/login', async (req, res) => {
    res.send(req.body);

    // Validate the payload from the post

    try {
        await login.validate(req.body);

        // attempt to find an existing record with the submitted email (findOne)
        const user = User.findOne(req.body).exec();
    } catch (error) {
        if (error.name === 'validationError') {
            return res.status(422).json(error.errors);
        }
        return res.status(500).send();
    }

    res.send('PlaceHolder');
});

export default router;
