import {Router} from "express";
import * as VoteController from "../controllers/vote.controller";
import {body} from "express-validator";
import {validateInputs} from "../middlewares/validate-inputs";
import {validateJwt} from "../helpers/validateJwt.help";
const router: Router = Router();

router.get("/", [], VoteController.listVoteMovie);
router.post("/", [
    validateJwt,
    body("score", "Ingrese el campo score no puede estar vacio").not().isEmpty().isInt({ min: 0, max: 5 }).withMessage("El campo score es númerico de 0 a 5"),
    body("movie", "Ingrese el campo movie el ID MOVIE").not().isEmpty().isMongoId().withMessage("Ingrese la ID Movie"),
    validateInputs
], VoteController.addVoteMovie);


export default router;