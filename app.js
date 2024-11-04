import express from "express";
import cors from "cors";
import todoRouter from "./routes/todo.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.get("/",(req,res) => {
    res.send("<h1>Server is up and running!</h1>")
})

app.use("/api/todo/",todoRouter)
app.use("/api/auth/",authRouter)
app.use("*",(req,res) => {
    res.status(404).send("<h1>Page not found</h1>")
})

export {app}