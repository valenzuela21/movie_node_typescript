import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";
export interface IMovie {
    title: string,
    description?: string,
    vote?: number,
    comments?: ObjectId[]
}
const MovieSchema =  new Schema<IMovie>({
    title:{
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    description:{
        type: String,
        required: false
    },
    vote:{
        type: Number,
        date: Date,
        required: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: false }],
});

export const Movie = model<IMovie>("Movie", MovieSchema);
