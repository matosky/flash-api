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
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const postIncident = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { type, description, location } = req.body;
    const photo = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    //   if (!type || !description || !location) {
    //     return res.status(400).json({ message: "fill required fields" });
    //   }
    if (photo) {
        try {
            const cloudImage = yield cloudinary_1.default.uploader.upload(photo, {
                folder: "memories",
            });
            if (cloudImage) {
                const newIncident = new incident_1.default({
                    type: type,
                    description: description,
                    photo: {
                        public_id: cloudImage.public_id,
                        url: cloudImage.secure_url,
                    },
                    location: location,
                });
                try {
                    const result = yield newIncident.save();
                    console.log(result);
                    res.status(201).json({ status: "success", data: result });
                }
                catch (err) {
                    res.status(400).json({ message: err });
                }
            }
        }
        catch (err) {
            console.log(err);
        }
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