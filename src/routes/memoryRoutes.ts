import express from "express";
import { Request, Response } from "express";
import {
  createMemory,
  deleteMemory,
  getAllMemories,
  getMemoryByUser,
  getOwnMemory,
  getSingleMemory,
  updateMemory,
} from "../controllers/memoryController";
import { authMiddleware } from "../middlewares/auth";
import { Upload } from "../middlewares/imageUpload";

const router = express.Router();

// router.use(authMiddleware)


router.get("/", authMiddleware, getAllMemories);
router.patch("/:id", updateMemory);
router.get("/:id", authMiddleware, getSingleMemory);
router.get("/user/:username", authMiddleware, getOwnMemory);
router.post("/", authMiddleware, Upload, createMemory);
router.delete("/:id", authMiddleware, deleteMemory);




export default router;
