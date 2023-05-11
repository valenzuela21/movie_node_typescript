import {Router} from "express";
import {body} from "express-validator";
import {login, register} from "../controllers/auth.controller";
import {validateInputs} from "../middlewares/validate-inputs";

const router: Router = Router();

router.post("/login",[
    body("email", "El correo es obligatorio").not().isEmpty().isEmail().withMessage("El correo electrónico no es correcto"),
    body("password", "La contraseña es obligatorio").not().isEmpty(),
    validateInputs
], login);

router.post("/register",[
    body("name", "El nombre es requerido").not().isEmpty(),
    body("email", "El correo es obligatorio").not().isEmpty().isEmail().withMessage("El correo electrónico no es correcto"),
    body("password", "La contraseña es obligatorio").not().isEmpty(),
    body("rol", "El rol es requerido").not().isEmpty(),
    validateInputs
], register);

export default router;