
import router from "./home.route";
import * as CommentController from "../controllers/comment.controller";
import {validateJwt} from "../helpers/validateJwt.help";
import {validateInputs} from "../middlewares/validate-inputs";
import {body} from "express-validator";

router.post("/",
    validateJwt,
    body("comment", "El comentario es requerido").not().isEmpty(),
    body("movie", "El campo ID Movie es requerido").not().isEmpty().isMongoId().withMessage("La ID Movie no es valida"),
    validateInputs
    ,CommentController.addComment);

export default router;