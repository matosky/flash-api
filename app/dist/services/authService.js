"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWT = exports.maxAge = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../env");
exports.maxAge = 3 * 24 * 60 * 60; // three days in seconds
const createJWT = (user) => {
    const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, `${env_1.secret}`, {
        expiresIn: exports.maxAge //expires in 3 days
    }); //takes in the object and the secret (in the .env fileß)
    return token;
};
exports.createJWT = createJWT;
//# sourceMappingURL=authService.js.map