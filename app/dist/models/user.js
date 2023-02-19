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
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const memory_1 = __importDefault(require("./memory"));
const userSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: [true, "Please provide a user name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 5,
    },
    gender: {
        type: String,
        required: true,
    },
});
//Hash a plain text password before saving
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            user.password = yield bcrypt_1.default.hash(user.password, 8);
        }
        next();
    });
});
//Login credentials validation
userSchema.static("findUserByCredentials", function findUserByCredentials(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.findOne({ email });
        console.log(user);
        if (!user) {
            throw new Error("Invalid Email");
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Incorrect Password");
        }
        return user;
    });
});
// Generte user authentication token
userSchema.method("genUserAuthToken", function genUserAuthToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const secret = process.env.JWT_SECRET;
        const maxAge = 3 * 24 * 60 * 60;
        const token = jsonwebtoken_1.default.sign({ _id: user._id.toString(), user_name: user.user_name }, secret, {
            expiresIn: maxAge,
        });
        yield user.save();
        return token;
    });
});
userSchema.virtual("myMemories", {
    ref: "Memory",
    localField: "_id",
    foreignField: "user_id",
});
userSchema.pre("remove", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        yield memory_1.default.deleteMany({ user_id: user._id });
        next();
    });
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map