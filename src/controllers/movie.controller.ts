import {Request, Response} from "express";
import {IMovie, Movie} from "../models/movie.model";

export const addNewMovie = async (req: Request, res: Response) => {

    const {title, description} = req.body;

    const movieDB = await Movie.findOne({title: title.name});
    if (movieDB) {
        return res.status(400).json({
            msg: "La pelicula se encuentra ya en la base de datos"
        });
    }


    const data: IMovie = {
        title,
        description,
        vote: 0,
        comments: []
    };

    const movie = new Movie(data);
    await movie.save();
    return res.status(201).json(movie);
};