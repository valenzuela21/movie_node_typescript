import {NextFunction, Request, Response} from "express";
import {IComment, Comment} from "../models/comments.model";
import {Movie} from "../models/movie.model";
import {ObjectId} from "mongodb";

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

export const listComments = async (req: Request | any, res: Response) => {
    const pageNumber: number = req.body.offset || 1;
    const nPerPage: number = req.body.perpage || 12;
    const comments = await Comment.find()
        .populate("movie")
        .populate("user", ["name", "email"])
        .sort({_id: 1})
        .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
        .limit(nPerPage);

    res.status(201).json(comments);
};


export const listCommentsByGroup = async (req: Request | any, res: Response) => {
    const offset: number = req.body.offset - 1 | 0;
    const per_page: number = req.body.per_page | 12;
    const commentsGroupDB = await Comment.aggregate(
        [
            {
                $group: {
                    _id: "$user",
                    comment: {
                        "$push": "$comment"
                    },
                    total: {$sum: 1},
                    //count: { $count: { } }
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
            {"$limit": per_page}
        ]
    );

    res.status(201).json({
        data: commentsGroupDB,
        page: offset + 1,
        limit: per_page
    });

};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const comment_id: string = req.params.id;
    try{
        await Comment.findOneAndDelete({ _id : comment_id });
        res.status(201).json({
            msg: "Se ha eliminado correctamente esl item de comentarios"
        })
    }catch (err){
        res.status(500).json({
            msg: "Error no se pudo eliminar dicho item"
        })
    }



};