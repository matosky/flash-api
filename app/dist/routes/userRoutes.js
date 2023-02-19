"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
// import { auth } from "../middlewares/auth";
const router = express_1.default.Router();
router.post("/signUp", userController_1.createUser);
router.post('/login', userController_1.loginUser);
router.get("/", userController_1.getAllUsers);
router.delete("/me", userController_1.deleteUser);
router.get("/:user", userController_1.getSingleUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map