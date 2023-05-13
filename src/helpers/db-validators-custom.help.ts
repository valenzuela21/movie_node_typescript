import {User} from "../models/user.model";
import {ObjectId} from "mongodb";
import {Movie} from "../models/movie.model";

export const emailExist = async (email: string = "") => {
    const existEmail = await User.findOne({email: email});
    if (existEmail) {
        throw new Error(`El correo: ${email}, ya está registrado`);
    }
};

export const existMovieById = async( id: ObjectId ) => {
    const existMovie = await Movie.findById(id);
    if ( !existMovie ) {
        throw new Error(`El id no existe ${ id }`);
    }
};