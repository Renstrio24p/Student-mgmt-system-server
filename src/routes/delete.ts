import express, { Request, Response } from 'express'
import { Expression, Model } from 'mongoose';
import { User } from '../models/user.model';
import { StudentDocument, UserDocument } from './types/router';
import { Student } from '../models/student.model';

// Dynamic Delete Router

// This delete route can reusable to any Models

export const deletes = express.Router()

deletes.post('/delete', async (req: Request, res: Response): Promise<Expression> => {
    try {
        const { type } = req.query;
        const { _id } = req.body;
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

        const deletedDocument = await Model.findByIdAndDelete(_id);

        if (!deletedDocument) {
            return res.status(404).send({ success: false, message: `${type} not found for deletion.` });
        }

        res.status(200).send({
            data: deletedDocument,
            success: true,
            message: `${type} deleted successfully.`
        });
    } catch (error) {
        console.error(`Error deleting ${req.body.type}:`, error);
        res.status(500).send({ success: false, message: "Internal server error." });
    }
});