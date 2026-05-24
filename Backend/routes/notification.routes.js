import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getUserNotifications, markNotificationAsRead } from "../Controllers/job.controller.js";

const router = express.Router();

router.route("/").get(isAuthenticated, getUserNotifications);
router.route("/:id/read").patch(isAuthenticated, markNotificationAsRead);
router.route("/:id/read").delete(isAuthenticated, markNotificationAsRead);



export default router;
