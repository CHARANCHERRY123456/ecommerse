import express from "express";
import { addToCartCtrl, removeFromCartCtrl, getCartCtrl } from "../controller/cartController.js";
import {authMiddleware} from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCartCtrl);
router.post("/remove", authMiddleware, removeFromCartCtrl);
router.get("/", authMiddleware, getCartCtrl);

export default router;
