// src/controllers/itemController.js
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} from "../service/itemService.js";

export async function createItemCtrl(req, res) {
  try {
    const item = await createItem(req.body);
    res.status(201).json({ message: "Item created", item });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getItemsCtrl(req, res) {
  try {
    const items = await getItems(req.query);
    res.json({ items });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getItemCtrl(req, res) {
  try {
    const item = await getItemById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ item });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateItemCtrl(req, res) {
  try {
    const item = await updateItem(req.params.id, req.body);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item updated", item });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteItemCtrl(req, res) {
  try {
    const item = await deleteItem(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
