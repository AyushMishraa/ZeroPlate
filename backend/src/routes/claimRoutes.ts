import { createClaim, getClaims } from "../controllers/claimController";
import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const router = Router();

router.post("/", verifyToken, authorizeRoles("receiver"), createClaim);
router.get("/", verifyToken, authorizeRoles("receiver"), getClaims);

export default router;