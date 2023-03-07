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
exports.changePassword = exports.deleteUser = exports.loginUser = exports.getSingleUser = exports.getAllUsers = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(JSON.parse(req.body.body));
        const newUser = yield user_1.default.create(JSON.parse(req.body.body));
        const token = yield newUser.genUserAuthToken();
        res.status(201).send({ newUser, token });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({});
        res.status(201).json({
            status: "success",
            result: users.length,
            data: {
                users,
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
exports.getAllUsers = getAllUsers;
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ user_name: req.params.user });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.status(200).json({
            status: "success",
            user: user
        });
    }
    catch (error) {
        res.status(500).json({ error: "No user found" });
    }
});
exports.getSingleUser = getSingleUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // const { email, password } = JSON.parse(req.body.body);
        const user = yield user_1.default.findUserByCredentials(email, password);
        console.log(email, password);
        console.log(user);
        const token = yield user.genUserAuthToken();
        console.log(token);
        res.status(200).json({ user, token });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message,
        });
    }
});
exports.loginUser = loginUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user;
    try {
        const user = yield user_1.default.findById(id);
        if (user !== null) {
            yield user.remove();
            res.status(204);
        }
    }
    catch (error) {
        res.status(400).json({
            error,
        });
    }
});
exports.deleteUser = deleteUser;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, email, newPassword } = req.body;
    try {
        const user = yield user_1.default.findOne({ email: email });
        console.log(user);
        if (user) {
            const { password } = user;
            const isMatch = yield bcrypt_1.default.compare(oldPassword, password);
            console.log("isMatch", isMatch);
            if (!isMatch) {
                return res.status(400).json("Incorrect Password");
            }
            const reset = yield user_1.default.findByIdAndUpdate({ _id: user.id }, { $set: { password: newPassword } });
            console.log("reset", reset);
            if (reset) {
                res.status(201).json("Password reset successful...");
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json("user not found");
    }
});
exports.changePassword = changePassword;
//# sourceMappingURL=userController.js.map