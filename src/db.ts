import Express from "express";

const mongoose = require("mongoose");

const URI = `${process.env.MONGO_URI}`;
const PORT = process.env.PORT || 8080;
export const connectDatabase = (app: Express.Application) => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("connected to database");
      app.listen(PORT, () => {
        console.log("listening for request at port ", PORT);
      });
    })
    .catch((err: any) => {
      console.log(err);
    });
};
