import express from 'express';
import {User} from '../schema/user.js';
import { getprofileURL } from './utils.js';
const router = express.Router();

router.put('/:id', async (req, res) => {
    const uid = req.params.id;
    const { profile, location } = req.body;
    console.log(req.body)
    const profileURL = await getprofileURL(profile);
    console.log(profileURL)
    try {
        
        
        // Update user document in MongoDB
        const updatedUser = await User.findByIdAndUpdate(uid, { profile: profileURL, location }, { new: true });

        if (updatedUser) {
            res.status(200).json({ message: 'Profile and location updated successfully', user: updatedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log("Error updating profile and location", error);
        res.status(500).json({ message: 'Internal server error' ,error});
    }
});

export default router;
