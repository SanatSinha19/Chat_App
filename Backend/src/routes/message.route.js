import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserForSidebar, getMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/user", protectRoute, getUserForSidebar);
router.get("/:id", protectRoute, getMessage);

export default router;