import express, { Request, Response } from 'express';
import { Expression, Model } from 'mongoose';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { PostDocument, StudentDocument, UserDocument } from './types/router';
import { Student } from '../models/student.model';

export const update = express.Router()

update.post('/update', async (req: Request, res: Response): Promise<Expression> => {
    try {

        const { type } = req.query;
        const { _id, ...updateData } = req.body;
        let Model: Model<any>;

        switch (type) {
            case "users":
                Model = User as Model<UserDocument>;
                break;
            case "student":
                Model = Student as Model<StudentDocument>;
                break;
            default:
                return res.status(400).send({ success: false, message: "Invalid type." });
        }

        const updatedDocument = await Model.findOneAndUpdate(
            { _id },
            updateData,
            { new: true }
        );

        if (!updatedDocument) {
            return res.status(404).send({ success: false, message: `${type} not found.` });
        }

        res.status(200).send({
            data: updatedDocument,
            success: true,
            message: `${type} updated successfully.`
        });
    } catch (error) {
        console.error(`Error updating ${req.body.type}:`, error);
        res.status(500).send({ success: false, message: "Internal server error." });
    }
});
