import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

const PORT = process.env.PORT || 5000;
const app = express()

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
    res.send("<h1>Server is up and running!</h1>")
})

app.listen(PORT, () => {
    console.log(`Server is running at : http://localhost:${PORT}`)
})