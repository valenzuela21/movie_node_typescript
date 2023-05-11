import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

export interface  IComment {
    comment: string,
    state?: boolean,
    user: ObjectId,
    movie: ObjectId
}


const CommentSchema =  new Schema<IComment>({
    comment: {
        type: String,
        required: [true, "El comentario es obligatorio"]
    },
    state:{
        type: Boolean,
        default: true,
        required: false
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    movie:{
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    }
});

export const Comment = model<IComment>("Comment", CommentSchema);
