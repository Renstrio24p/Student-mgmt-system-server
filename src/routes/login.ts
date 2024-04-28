import express from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import { Expression } from 'mongoose';

export const login = express.Router();

login.post('/login', async (req, res): Promise<Expression> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return res.status(200).json({ success: true, message: "Login successfully." });
        } else {
            return res.status(401).json({ success: false, message: "Incorrect password." });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});
