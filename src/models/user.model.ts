import { model, Schema } from "mongoose";
import { UserDocument } from "../routes/types/router";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

export const User = model<UserDocument>("User", userSchema);