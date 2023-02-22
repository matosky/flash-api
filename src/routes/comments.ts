import express  from "express";
import { createComment, deleteComment } from "../controllers/comments";

const router = express.Router();


router.post("/:memoryId", createComment)
router.delete("/:memoryId/comments/:commentId", deleteComment);



export default router;