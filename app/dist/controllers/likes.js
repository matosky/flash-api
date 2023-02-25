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
exports.decreaseLikes = exports.increaseLikes = void 0;
const memory_1 = __importDefault(require("../models/memory"));
const increaseLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memoryId = req.params.id;
    console.log(memoryId);
    if (!memoryId) {
        return res.status(400).json({ status: "failed", message: "memory id required" });
    }
    try {
        const result = yield memory_1.default.updateOne({ _id: memoryId }, { $inc: { likes: 1, liked: true } });
        console.log(result);
        if (result) {
            res.status(200).json({ status: "success", message: "like increased successfully", data: result });
        }
    }
    catch (err) {
        res.status(404).json({ message: "memory not found" });
    }
});
exports.increaseLikes = increaseLikes;
const decreaseLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memoryId = req.params.id;
    try {
        const memory = yield memory_1.default.findOne({ _id: memoryId });
        if (memory === null || memory === void 0 ? void 0 : memory.liked) {
            console.log(memory);
            return res.json({ data: memory, msg: "no way" });
        }
    }
    catch (err) {
        console.log(err);
    }
    if (!memoryId) {
        return res.status(400).json({ status: "failed", message: "memory id required" });
    }
    try {
        const result = yield memory_1.default.updateOne({ _id: memoryId }, { $inc: { likes: -1, liked: false } });
        console.log(result);
        if (result) {
            res.status(200).json({ status: "success", data: result });
        }
    }
    catch (err) {
        res.status(404).json({ message: "memory not found" });
    }
});
exports.decreaseLikes = decreaseLikes;
//# sourceMappingURL=likes.js.map