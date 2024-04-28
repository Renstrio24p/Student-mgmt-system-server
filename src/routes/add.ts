import express, { Request, Response } from 'express';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { Student } from '../models/student.model';
import { UserDocument, StudentDocument } from './types/router';

// Dynamic Add Router
export const add = express.Router();

add.post('/add', async (req: Request, res: Response) => {
    try {
        const { type } = req.query;
        const { ...data } = req.body;

        let Model: Model<any>;

        switch (type) {
            case 'users':
                Model = User as Model<UserDocument>;
                break;
            case 'student':
                Model = Student as Model<StudentDocument>;
                break;
            default:
                return res.status(400).json({ success: false, message: 'Invalid type.' });
        }

        const newDocument = new Model(data);
        await newDocument.save();

        return res.status(200).json({
            success: true,
            message: `${type} added successfully.`,
            data: newDocument,
        });
    } catch (error) {
        console.error(`Error adding ${req.body.type}:`, error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});
