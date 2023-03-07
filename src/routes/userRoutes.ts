import express, { Application, Request, Response, NextFunction } from "express";
import { createUser, deleteUser, getAllUsers, getSingleUser, loginUser, changePassword } from "../controllers/userController";
// import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/signUp", createUser);
router.post('/login', loginUser)
router.get("/", getAllUsers);
router.delete("/me", deleteUser);
router.get("/:user", getSingleUser);
router.patch("/changePassword", changePassword);


export default router;
