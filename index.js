import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import todoRouter from "./routes/todo.js";
import authRouter from "./routes/auth.js";

dotenv.config()

const PORT = process.env.PORT || 5000;
const app = express()

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
    res.send("<h1>Server is up and running!</h1>")
})

app.use("/api/todo/",todoRouter)
app.use("/api/auth/",authRouter)
app.use("*",(req,res) => {
    res.status(404).send("<h1>Page not found</h1>")
})
app.listen(PORT, () => {
    console.log(`Server is running at : http://localhost:${PORT}`)
})