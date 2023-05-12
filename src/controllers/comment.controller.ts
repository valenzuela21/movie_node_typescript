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
    const offset: number = req.body.offset - 1 | 0;
    const per_page: number = req.body.per_page | 12;
    const movieGeneralGroup = await Comment.aggregate(
        [
            {
                $group: {
                    _id: "$user",
                    movie: {
                        "$push": "$movie"
                    },
                    total: {$sum: 1}
                },

            },]);
    const movieDB = await Comment.aggregate(
        [
            {
                $group: {
                    _id: "$user",
                    comment: {
                        "$push": "$comment"
                    },
                    total: {$sum: 1}
                },

            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "_id"
                }
            },
            {$unset: ["_id.password", "_id.email", "_id.rol", "_id.state"]},
            {"$skip": offset},
            {"$limit": per_page},
        ]
    );

    res.status(201).json({
        data: movieDB,
        page: offset + 1,
        limit: per_page,
        total: movieGeneralGroup.length
    });

};