"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // specify upload directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // use original filename
    },
});
exports.Upload = (0, multer_1.default)({
    storage: storage,
});
// export const Upload = multer({ dest: 'uploads/' })
//# sourceMappingURL=imageUpload.js.map