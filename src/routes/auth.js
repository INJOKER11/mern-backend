import checkAuth from "../middleware/checkAuth.js";
import { Router } from "express";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import { loginValidation, registerValidation } from "../validation/auth.js";
import { getMe, login, register } from "../controllers/UserController.js";

const router = Router();

router.post("/login", ...loginValidation, login);
router.post(
  "/register",
  ...registerValidation,
  handleValidationErrors,
  register,
);
router.get("/me", checkAuth, getMe);

export default router;
