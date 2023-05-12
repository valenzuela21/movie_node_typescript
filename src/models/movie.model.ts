import {model, Schema} from "mongoose";
export interface IMovie {
    title: string,
    description?: string,
    vote?: number,
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
    vote:{
        type: Number,
        date: Date,
        required: false
    },
});

export const Movie = model<IMovie>("Movie", MovieSchema);
