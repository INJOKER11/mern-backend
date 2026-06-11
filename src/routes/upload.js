import { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import upload from "../config/multer.js";

const router = Router();

router.post("/", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/${req.file.originalname}`,
  });
});

export default router;
