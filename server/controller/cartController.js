import { addToCart, removeFromCart, getCart } from "../service/cartService.js";

export async function addToCartCtrl(req, res) {
  try {
    const { itemId, quantity } = req.body;
    
    // Enhanced validation
    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }
    
    if (quantity > 99) {
      return res.status(400).json({ message: "Quantity cannot exceed 99" });
    }
    
    const userId = req.user._id;

    const cart = await addToCart(userId, itemId, quantity);
    res.json({ message: "Item added to cart successfully", cart });
  } catch (err) {
    console.error("Add to cart error:", err.message);
    res.status(400).json({ message: err.message });
  }
}

export async function removeFromCartCtrl(req, res) {
  try {
    const { itemId } = req.body;
    
    // Enhanced validation
    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }
    
    const userId = req.user._id;

    const cart = await removeFromCart(userId, itemId);
    res.json({ message: "Item removed from cart successfully", cart });
  } catch (err) {
    console.error("Remove from cart error:", err.message);
    res.status(400).json({ message: err.message });
  }
}

export async function getCartCtrl(req, res) {
  try {
    const userId = req.user._id;
    const cart = await getCart(userId);
    res.json({ cart });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
