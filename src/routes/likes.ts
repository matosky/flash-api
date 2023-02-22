import express from "express";
import { decreaseLikes, increaseLikes } from "../controllers/likes";

const router = express.Router();

router.put("/like/:id", increaseLikes)
router.put("/unlike/:id", decreaseLikes)






export default router;