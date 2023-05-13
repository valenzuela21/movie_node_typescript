import {Router} from "express";
import {body} from "express-validator";
import * as AuthController from "../controllers/auth.controller";
import {validateInputs} from "../middlewares/validate-inputs";

const router: Router = Router();

router.get("/list_users",[], AuthController.listUsers);


router.post("/login",[
    body("email", "El correo es obligatorio").not().isEmpty().isEmail().withMessage("El correo electrónico no es correcto"),
    body("password", "La contraseña es obligatorio").not().isEmpty(),
    validateInputs
], AuthController.login);

router.post("/register",[
    body("name", "El nombre es requerido").not().isEmpty(),
    body("email", "El correo es obligatorio").not().isEmpty().isEmail().withMessage("El correo electrónico no es correcto"),
    body("password", "La contraseña es obligatorio").not().isEmpty(),
    body("rol", "El rol es requerido").not().isEmpty(),
    validateInputs
], AuthController.register);

export default router;