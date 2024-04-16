import express from 'express';
import {User} from '../schema/user.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    const uid = req.params.id;
    try {
        const userData = await User.findById(uid); 
        if (userData) {
            res.status(200).json({ user: userData });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log("Error finding the user profile", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
