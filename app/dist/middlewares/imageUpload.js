"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = void 0;
const multer_1 = __importDefault(require("multer"));
// import { Request, Response } from "express";
// const storage = multer.diskStorage({
//     destination: function (req: Request, file: Express.Multer.File, cb) {
//         cb(null, './assets/uploads');
//     },
//     filename: function (req: Request, file: Express.Multer.File, cb) {
//         cb(null, `${Date.now()}--${file.originalname}`);
//     }
// });
exports.Upload = (0, multer_1.default)({ dest: 'uploads/' }).single("image");
//# sourceMappingURL=imageUpload.js.map