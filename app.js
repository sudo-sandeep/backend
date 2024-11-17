import express from "express";
import cors from "cors";
import todoRouter from "./routes/todo.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "*"] }));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/", (req, res) => {
    res.send("<h1>Server is up and running!</h1>");
});
app.get("/api/v1/", (req, res) => {
    res.send("<h1>API's are working!</h1>");
});

app.use("/api/v1/todo/", todoRouter);
app.use("/api/v1/user/", userRouter);
app.use("*", (req, res) => {
    res.status(404).send("<h1>Page not found</h1>");
});

export { app };
