import { model, Schema } from "mongoose";
import { PostDocument } from "../routes/types/router";

const postSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    collections: {
        type: String,
        required: false
    },
    flavors: {
        type: [String],
        required: false
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const Post = model<PostDocument>("Post", postSchema);

