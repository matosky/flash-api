import express, { urlencoded } from "express";
import cors from "cors";
import * as dotenv from "dotenv"

dotenv.config()

import { connectDatabase } from "./db";
import MemoryRouter from "./routes/memoryRoutes"
import userRouter from "./routes/userRoutes";
import likeRouter from "./routes/likes"
import commentRouter from "./routes/comments"

const app = express();


app.use(cors())
app.use(express.json());
app.use("/static", express.static("assets/uploads"));


app.use("/api/memories", MemoryRouter);
app.use("/api/users", userRouter);
app.use("/api/likes", likeRouter);
app.use("/api/memory/comments", commentRouter);

connectDatabase(app);

