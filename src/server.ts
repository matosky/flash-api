import express, { urlencoded } from "express";
import cors from "cors";
import * as dotenv from "dotenv"

dotenv.config()

import { connectDatabase } from "./db";
import MemoryRouter from "./routes/memoryRoutes"
import userRouter from "./routes/userRoutes";

const app = express();


app.use(cors())
app.use(express.json());
app.use("/static", express.static("assets/uploads"));


app.use("/api/memories", MemoryRouter);
app.use("/api/users", userRouter)

connectDatabase(app);

