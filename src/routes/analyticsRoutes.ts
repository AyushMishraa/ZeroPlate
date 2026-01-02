import { Router } from "express";
import { authorizeRoles } from "../middlewares/roleMiddleware";
import { verifyToken } from "../middlewares/authMiddleware";
import { getSummary, getTopDonors, getFrauds} from "../controllers/anylaticsController";

const router = Router();

router.use(verifyToken, authorizeRoles("admin"));

router.get('/getAnalytics', getSummary);
router.get('/top-donors', getTopDonors);
router.get('/frauds', getFrauds);

export default router;