import { addToCart, removeFromCart, getCart } from "../services/cartService.js";

export async function addToCartCtrl(req, res) {
  try {
    const { itemId, quantity } = req.body;
    const userId = req.user.userId;

    const cart = await addToCart(userId, itemId, quantity);
    res.json({ message: "Item added to cart", cart });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function removeFromCartCtrl(req, res) {
  try {
    const { itemId } = req.body;
    const userId = req.user.userId;

    const cart = await removeFromCart(userId, itemId);
    res.json({ message: "Item removed from cart", cart });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getCartCtrl(req, res) {
  try {
    const userId = req.user.userId;
    const cart = await getCart(userId);
    res.json({ cart });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
