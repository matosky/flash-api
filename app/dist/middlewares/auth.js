"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.authMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const secret = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        console.log("auth fired");
        return res.status(401).send('Access denied. No token provided.');
    }
    const token = authorization.split(' ')[1];
    try {
        const { user_name } = jwt.verify(token, secret);
        const user = yield user_1.default.findOne({ user_name }).select("user_name");
        if (!user) {
            return res.status(400).json({ message: 'Invalid Token' });
        }
        req.user = user.user_name;
        next();
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.authMiddleware = authMiddleware;
//   const bearerHeader = req.headers['authorization']
//   if (bearerHeader !== undefined) {
//   const bearerToken = bearerHeader.split(' ')[1]
//     interface Dec {
//       _id: string,
//       user_name: string,
//       iat: number,
//       exp: number
//     }
//     const decoded: Dec = jwt.verify(bearerToken, secret) as Dec
//     if (!decoded) {
//       res.sendStatus(403)
//     }
//     req._id = decoded._id
//     req.user_name = decoded.user_name
//     next()
//   } else {
//     res.sendStatus(403)
//   }
// }
//# sourceMappingURL=auth.js.map