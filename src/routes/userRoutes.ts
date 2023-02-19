import express, { Application, Request, Response, NextFunction } from "express";
import { createUser, deleteUser, getAllUsers, getSingleUser, loginUser } from "../controllers/userController";
// import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/signUp", createUser);
router.post('/login', loginUser)
router.get("/", getAllUsers);
router.delete("/me", deleteUser)
router.get("/:user", getSingleUser)


export default router;
