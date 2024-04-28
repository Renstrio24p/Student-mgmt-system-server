import { model, Schema } from "mongoose";
import { StudentDocument } from "../routes/types/router";

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    course: {
        type: [String],
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }

});

export const Student = model<StudentDocument>("Student", studentSchema);