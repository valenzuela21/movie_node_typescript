import {model, Schema} from "mongoose";
import {IVote} from "./vote.model";
export interface IMovie {
    title: string,
    description?: string,

}

const MovieSchema =  new Schema<IMovie>({
    title:{
        type: String,
        required: [true, "El campo title es obligatorio"]
    },
    description:{
        type: String,
        required: false
    },

});

export const Movie = model<IMovie>("Movie", MovieSchema);
