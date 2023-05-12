
import router from "./home.route";
import * as CommentController from "../controllers/comment.controller";
import {validateJwt} from "../helpers/validateJwt.help";
import {validateInputs} from "../middlewares/validate-inputs";
import {body, param, query} from "express-validator";
import {validateNumberNegative} from "../middlewares/validate-number-negative";
import {listComments} from "../controllers/comment.controller";

router.post("/",
    validateJwt,
    body("comment", "El comentario es requerido").not().isEmpty(),
    body("movie", "El campo ID Movie es requerido").not().isEmpty().isMongoId().withMessage("La ID Movie no es valida"),
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