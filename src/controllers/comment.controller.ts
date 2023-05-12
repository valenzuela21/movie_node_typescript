import {Request, Response} from "express";
import {IComment, Comment} from "../models/comments.model";
import {Movie} from "../models/movie.model";

export const addComment = async (req: Request | any, res: Response) => {
    const {comment, state, movie} = req.body;

    const movieDB = await Movie.findById({_id: movie});

    if (!movieDB) {
        return res.status(200).json({
            msg: "Error no existe esta movie en la base de datos"
        });
    }

    const data: IComment = {
        comment,
        state,
        user: req.user._id,
        movie
    };

    const comments = new Comment(data);

    await comments.save();

    res.status(201).json(comments);
};


export const listCommentsByGroup = async (req: Request | any, res: Response) => {
    const movieDB = await Comment.aggregate(
        [
            {
                $group: {
                    _id: "$user",
                    movie: {
                        "$push": "$movie"
                    },
                    total: {$sum: 1}
                },

            },
           {
                $lookup: {
                    from:"users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "_id"
                }
            },
            {
                $lookup: {
                    from:"movies",
                    localField: "movie",
                    foreignField: "_id",
                    as: "movie"
                }
            },

        ]
    );

    res.status(201).json(movieDB);

};
