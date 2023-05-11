
import router from "./home.route";
import * as CommentController from "../controllers/comment.controller";
import {validateJwt} from "../helpers/validateJwt.help";
import {validateInputs} from "../middlewares/validate-inputs";
import {body} from "express-validator";

router.post("/",
    validateJwt,
    body("comment", "El comentario es requerido").not().isEmpty(),
    validateInputs
    ,CommentController.addComment);

export default router;