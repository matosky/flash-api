"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloud_name = exports.cloud_key_secret = exports.cloud_key = exports.mongo_uri = exports.secret = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT;
exports.port = port;
const secret = process.env.JWT_SECRET;
exports.secret = secret;
const mongo_uri = process.env.MONG_URI;
exports.mongo_uri = mongo_uri;
const cloud_name = process.env.CLOUD_NAME;
exports.cloud_name = cloud_name;
const cloud_key = process.env.CLOUD_KEY;
exports.cloud_key = cloud_key;
const cloud_key_secret = process.env.CLOUD_KEY_SECRET;
exports.cloud_key_secret = cloud_key_secret;
//# sourceMappingURL=env.js.map