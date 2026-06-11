import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import uploadRoutes from "./routes/upload.js";

const app = express();

app.use(express.json());
app.use("/uploads", express.static("src/uploads"));

app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/upload", uploadRoutes);

export default app;
