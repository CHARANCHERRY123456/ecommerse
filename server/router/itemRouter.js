import express from "express";
import {
  createItemCtrl,
  getItemsCtrl,
  getItemCtrl,
  updateItemCtrl,
  deleteItemCtrl
} from "../controller/itemController.js";
import {authMiddleware} from "../middleware/auth.js";

const router = express.Router();

router.get("/", getItemsCtrl);
router.get("/:id", getItemCtrl);

router.post("/", authMiddleware, createItemCtrl);
router.put("/:id", authMiddleware, updateItemCtrl);
router.delete("/:id", authMiddleware, deleteItemCtrl);

export default router;
