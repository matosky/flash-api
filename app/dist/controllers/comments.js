"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.createComment = void 0;
const memory_1 = __importDefault(require("../models/memory"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memoryId = req.params.memoryId;
    const { name, text } = JSON.parse(req.body.body);
    // console.log({memoryId, comment})
    if (!memoryId) {
        return res.status(400).json({ status: "failed", message: "memory id needed" });
    }
    try {
        const memory = yield memory_1.default.findByIdAndUpdate(memoryId, { $push: { comments: { name, text } } }, { new: true });
        if (memory) {
            res.status(201).json({ status: "success", message: "successfully added comment", data: memory });
        }
    }
    catch (err) {
        res.status(400).json({ status: "faild", message: "comment could not be created" });
    }
});
exports.createComment = createComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memoryId = req.params.memoryId;
    const commentId = req.params.commentId;
    if (!memoryId || !commentId) {
        return res.status(400).json({ status: "failed", message: "memory or comment id needed" });
    }
    try {
        const memory = yield memory_1.default.findByIdAndUpdate(memoryId, { $pull: { comments: { _id: commentId } } }, { new: true });
        if (memory) {
            res.status(200).json({ status: "success", message: "successfully deleted comment", data: memory });
        }
    }
    catch (err) {
        res.status(400).json({ status: "failed", message: "comment could not be created" });
    }
});
exports.deleteComment = deleteComment;
//# sourceMappingURL=comments.js.map