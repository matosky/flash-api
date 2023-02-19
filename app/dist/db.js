"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose = require("mongoose");
const URI = `${process.env.MONGO_URI}`;
const PORT = process.env.PORT || 8080;
const connectDatabase = (app) => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log("listening for request at port ", PORT);
        });
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=db.js.map