import router from "./auth.route";
import {validateJwt} from "../helpers/validateJwt.help";
import {addNewMovie} from "../controllers/movie.controller";
import {body} from "express-validator";
import {validateInputs} from "../middlewares/validate-inputs";

router.post("/",[
    validateJwt,
    body("title", "El campo titulo es requerido").not().isEmpty(),
    validateInputs
], addNewMovie);

export default router;