import * as CommentController from "../controllers/comment.controller";
import {validateJwt} from "../helpers/validateJwt.help";
import {validateInputs} from "../middlewares/validate-inputs";
import {body} from "express-validator";
import {validateNumberNegative} from "../middlewares/validate-number-negative";
import {Router} from "express";
import {existMovieById} from "../helpers/db-validators-custom.help";

const router: Router = Router();

router.post("/",
    validateJwt,
    body("comment", "El comentario es requerido").not().isEmpty(),
    body("movie", "El campo ID Movie es requerido").not().isEmpty().isMongoId().withMessage("La ID Movie no es valida").custom(existMovieById),
    validateInputs
    ,CommentController.addComment);

router.get("/list", [
    validateNumberNegative
], CommentController.listComments);

router.get("/list_group",[
    validateNumberNegative
], CommentController.listCommentsByGroup);

router.delete("/:id", [ validateJwt ], CommentController.deleteComment);
export default router;