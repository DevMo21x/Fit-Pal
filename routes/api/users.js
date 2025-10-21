import express from 'express';
import { passwordStrength } from 'check-password-strength';
import bcrypt from 'bcrypt';
import User from '../../Models/user.js';
import login from '../../Models/login.js';
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', async (req, res) => {
    // Grabbing the password property from the req.body object
    const { password } = req.body;
    const strength = passwordStrength(password);

    if (strength.id <= 1) {
        return res.status(422).json({
            error: 'Password does not meet the requirements.',
            requirements:
                'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.',
        });
    }

    try {
        
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            ...req.body,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({
            email: newUser.email,
            id: newUser._id,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(422).json(error.errors);
        }
        return res.status(500).send();
    }
});

// router.post('/login', async (req, res) => {
//     res.send(req.body);

//     // Validate the payload from the post

//     try {
//         await login.validate(req.body);

//         // attempt to find an existing record with the submitted email (findOne)
//         const user = User.findOne(req.body).exec();
//     } catch (error) {
//         if (error.name === 'validationError') {
//             return res.status(422).json(error.errors);
//         }
//         return res.status(500).send();
//     }

//     res.send('PlaceHolder');
// });

export default router;
