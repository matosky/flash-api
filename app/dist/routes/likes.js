"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likes_1 = require("../controllers/likes");
const router = express_1.default.Router();
router.put("/like/:id", likes_1.increaseLikes);
router.put("/unlike/:id", likes_1.decreaseLikes);
exports.default = router;
//# sourceMappingURL=likes.js.map