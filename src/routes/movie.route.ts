import {validateJwt} from "../helpers/validateJwt.help";
import * as MovieController from "../controllers/movie.controller";
import {body} from "express-validator";
import {validateInputs} from "../middlewares/validate-inputs";
import {validateNumberNegative} from "../middlewares/validate-number-negative";
import {Router} from "express";

const router: Router = Router();

router.get("/list", [
    validateNumberNegative
], MovieController.listMovies);
router.get("/search/:term", [], MovieController.searchFilterMovies);
router.post("/", [
    validateJwt,
    body("title", "El campo titulo es requerido").not().isEmpty(),
    validateInputs
], MovieController.addNewMovie);

export default router;