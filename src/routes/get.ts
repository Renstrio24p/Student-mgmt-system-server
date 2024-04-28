import express, { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Student } from '../models/student.model';

export const getall = express.Router();

getall.get('/getall', async (req: Request, res: Response): Promise<void> => {
    try {
        const { type } = req.query;
        let responseData;

        if (type === 'users') {
            responseData = await User.find();
        } else if (type === 'students') {
            responseData = await Student.find();
        } else {
            throw new Error('Invalid type parameter');
        }

        res.status(200).json({
            success: true,
            message: "Get all data.",
            data: responseData,
        });
    } catch (error) {
        console.error('Error getting all data:', error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});
