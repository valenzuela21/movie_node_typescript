import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

export interface  IComment {
    comment: string,
    state: boolean,
    user: ObjectId
}


const CommentSchema =  new Schema<IComment>({
    comment: {
        type: String,
        required: [true, "El comentario es obligatorio"]
    },
    state:{
        type: Boolean,
        default: true,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export const Comment = model<IComment>("Comment", CommentSchema);
