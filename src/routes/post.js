import { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  index,
  getRecord,
  create,
  update,
  deleteRecord,
} from "../controllers/PostController.js";
import { postCreateValidation } from "../validation/post.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

const router = Router();

router.get("/", index);
router.get("/:id", getRecord);
router.post(
  "/",
  checkAuth,
  ...postCreateValidation,
  handleValidationErrors,
  create,
);
router.patch(
  "/:id",
  checkAuth,
  ...postCreateValidation,
  handleValidationErrors,
  update,
);
router.delete("/:id", checkAuth, deleteRecord);

export default router;
