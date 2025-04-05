import { Router } from "express"
const router = Router()
import { getRecentActivities } from "../controllers/activityControllers.js"

router.get("/", getRecentActivities)

export default router
