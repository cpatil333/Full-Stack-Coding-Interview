import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./util/connectDB.js";
import userRouter from "./routes/user-route.js";
import notesRouter from "./routes/notes-route.js";
import cookieParser  from "cookie-parser";

//intial lise
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const port = process.env.PORT || 5000;

app.use("/app/v1/user", userRouter);
app.use("/app/v1/notes", notesRouter);

connectDB();

app.listen(port, () => {
  console.log(`Datbase Connection...${port}`);
});
