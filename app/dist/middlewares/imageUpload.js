"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = void 0;
const multer_1 = __importDefault(require("multer"));
exports.Upload = (0, multer_1.default)({ dest: 'uploads/' }).single("image");
//# sourceMappingURL=imageUpload.js.map