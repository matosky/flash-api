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
exports.getAllIncidents = exports.postIncident = void 0;
const incident_1 = __importDefault(require("../models/incident"));
const postIncident = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, description, location } = req.body;
    if (!type || !description || !location) {
        return res.status(400).json({ message: "fill required fields" });
    }
    try {
        const newIncident = new incident_1.default({
            type: type,
            location: location,
            description: description
        });
        const result = yield newIncident.save();
        if (result) {
            return res.status(201).json({ status: "success", message: result });
        }
    }
    catch (err) {
        res.status(400).json({ status: "failed", message: "invalid report", error: err });
    }
});
exports.postIncident = postIncident;
const getAllIncidents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield incident_1.default.find({}, null, { sort: { createdAt: -1 } });
        return res.status(201).json({ status: "success", data: result });
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.getAllIncidents = getAllIncidents;
//# sourceMappingURL=incident.js.map