import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { PORT } from "./utils/constants.js";

dotenv.config();

connectDB()
    .then(() =>
        app.listen(PORT, () => {
            console.log(`Server is running at : http://localhost:${PORT}`);
        })
    )
    .catch((err) => console.log(err));
