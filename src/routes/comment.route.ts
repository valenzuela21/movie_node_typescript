
import router from "./home.route";
import * as CommentController from "../controllers/comment.controller";

router.get("/", CommentController.addComment);

export default router;