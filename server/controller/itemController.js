// src/controllers/itemController.js
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} from "../service/ItemService.js";

export async function createItemCtrl(req, res) {
  try {
    const { name, price, category, description, imageUrl } = req.body;
    
    // Enhanced validation
    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required" });
    }
    
    if (name.trim().length < 2) {
      return res.status(400).json({ message: "Product name must be at least 2 characters long" });
    }
    
    if (price < 0) {
      return res.status(400).json({ message: "Price cannot be negative" });
    }
    
    if (price > 1000000) {
      return res.status(400).json({ message: "Price cannot exceed ₹10,00,000" });
    }
    
    const validCategories = ["Food", "Electronics", "Clothing", "Books", "Home", "Beauty", "Sports", "Toys", "Automotive", "Health", "Other"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category selected" });
    }

    const item = await createItem(req.body);
    res.status(201).json({ message: "Item created successfully", item });
  } catch (err) {
    console.error("Create item error:", err.message);
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
