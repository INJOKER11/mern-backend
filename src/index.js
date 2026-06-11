import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

await connectDB();

app.listen(process.env.PORT || 4444);
