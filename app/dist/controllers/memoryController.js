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
exports.getSingleMemory = exports.getAllMemories = exports.getMemoryByUser = exports.getOwnMemory = exports.deleteMemory = exports.updateMemory = exports.createMemory = void 0;
const memory_1 = __importDefault(require("../models/memory"));
const user_1 = __importDefault(require("../models/user"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const createMemory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const photo = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    const { title, description, location } = req.body;
    const user_id = req.user;
    const comments = [{ user: "you the best" }];
    console.log(req.file);
    console.log("USERID>>", req.user);
    if (photo) {
        const cloudImage = yield cloudinary_1.default.uploader.upload(photo, {
            folder: "memories",
        });
        const memory = new memory_1.default({
            user_id: user_id,
            photo: {
                public_id: cloudImage.public_id,
                url: cloudImage.secure_url,
            },
            title: title,
            description: description,
            location: location,
            comments: comments,
        });
        try {
            const newMemory = yield memory.save();
            console.log(newMemory);
            res.status(201).json({
                status: "success",
                data: {
                    memory: newMemory,
                },
            });
        }
        catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }
});
exports.createMemory = createMemory;
const updateMemory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allowedUpdates = ["description", "title"];
    const updates = Object.keys(req.body);
    const isValidUpdates = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdates)
        return res.status(400).send({ Error: "Unknown update!" });
    try {
        const memory = yield memory_1.default.findOne({ _id: req.params.id });
        if (!memory) {
            res.status(404).send();
        }
        updates.forEach((update) => (memory[update] = req.body[update]));
        yield memory.save();
        res.status(200).json({
            status: "success",
            data: {
                memory,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
});
exports.updateMemory = updateMemory;
const deleteMemory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    try {
        const memory = yield memory_1.default.findByIdAndRemove({ _id: req.params.id });
        if (!memory) {
            res.status(400).json({
                status: "fail",
                message: `No memory with id: ${req.params.id} exist`,
            });
        }
        else {
            res.status(200).json({
                status: "success",
                data: {
                    memory,
                },
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
});
exports.deleteMemory = deleteMemory;
const getOwnMemory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ user_name: req.params.username });
        if (!user) {
            return res.status(404).json("User not found");
        }
        const ownMemory = yield memory_1.default.find({ user_id: user.user_name });
        if (!ownMemory) {
            res.status(204).json({
                status: "success",
                message: "You have not created any memory",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                memory: ownMemory,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
});
exports.getOwnMemory = getOwnMemory;
const getMemoryByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_name } = req.body;
    try {
        const user = yield user_1.default.findOne({ user_name });
        if (!user) {
            res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }
        const userMemories = yield memory_1.default.find({ user_name });
        if (!userMemories) {
            res.status(404).json({
                status: "fail",
                message: "User has not created a memory",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                memory: userMemories,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
});
exports.getMemoryByUser = getMemoryByUser;
const getAllMemories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("all memories fired");
    try {
        const memories = yield memory_1.default.find({}, null, { sort: { createdAt: -1 } });
        res.status(200).json({
            status: "success",
            results: memories.length,
            data: {
                memories,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            message: error,
        });
    }
});
exports.getAllMemories = getAllMemories;
const getSingleMemory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    try {
        const memory = yield memory_1.default.findById(id);
        if (!memory) {
            res.status(404).json("Memory no found");
        }
        res.status(200).json({
            status: "success",
            data: {
                memory,
            },
        });
        next();
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            message: error,
        });
    }
});
exports.getSingleMemory = getSingleMemory;
//# sourceMappingURL=memoryController.js.map