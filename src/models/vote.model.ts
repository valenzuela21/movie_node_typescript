import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

export interface  IVote {
    score: number,
    user: ObjectId,
    movie: ObjectId
}



const VoteSchema = new Schema<IVote>({
    score:{
        type: Number,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    movie:{
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    }
});

export const Vote = model<IVote>("Vote", VoteSchema);
