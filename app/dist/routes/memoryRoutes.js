"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memoryController_1 = require("../controllers/memoryController");
const auth_1 = require("../middlewares/auth");
const imageUpload_1 = require("../middlewares/imageUpload");
const router = express_1.default.Router();
// router.use(authMiddleware)
router.get("/", auth_1.authMiddleware, memoryController_1.getAllMemories);
router.patch("/:id", memoryController_1.updateMemory);
router.get("/:id", auth_1.authMiddleware, memoryController_1.getSingleMemory);
router.get("/user/:username", auth_1.authMiddleware, memoryController_1.getOwnMemory);
router.post("/", auth_1.authMiddleware, imageUpload_1.Upload, memoryController_1.createMemory);
router.delete("/:id", auth_1.authMiddleware, memoryController_1.deleteMemory);
exports.default = router;
//# sourceMappingURL=memoryRoutes.js.map