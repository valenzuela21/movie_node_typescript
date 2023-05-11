import router from "./auth.route";
import {validateJwt} from "../helpers/validateJwt.help";
import {addNewMovie} from "../controllers/movie.controller";

router.post("/",[
    validateJwt
], addNewMovie);

export default router;