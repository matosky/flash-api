"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const memorySchema = new mongoose_1.Schema({
    photo: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
    },
    likes: { type: Number, default: 0 },
    comments: {
        type: [
            {
                name: { type: String, required: true },
                text: { type: String, required: true },
            },
        ],
        default: [],
    },
}, { timestamps: true });
const Memory = (0, mongoose_1.model)("Memory", memorySchema);
exports.default = Memory;
//# sourceMappingURL=memory.js.map