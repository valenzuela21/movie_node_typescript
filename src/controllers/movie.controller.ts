import {Request, Response} from "express";
import {IMovie, Movie} from "../models/movie.model";

export const listMovies  =  async (req: Request, res: Response) => {
    const pageNumber: number = req.body.offset || 1;
    const nPerPage: number = req.body.perpage || 12;
    const movies = await Movie.find()
        .sort( { _id: -1 } )
        .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
        .limit( nPerPage );
    return res.status(201).json(movies);
};



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
        vote: 0
    };

    const movie = new Movie(data);
    await movie.save();
    return res.status(201).json(movie);
};