import User from "../models/User.js";
import Item from "../models/Item.js";

export async function addToCart(userId, itemId, quantity = 1) {
  const user = await User.findById(userId);
  console.log(user , "is the user ");
  
  if (!user) throw new Error("User not found");

  const item = await Item.findById(itemId);
  if (!item) throw new Error("Item not found");

  const existingItem = user.cart.find(ci => ci.itemId.toString() === itemId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.push({ itemId, quantity });
  }

  await user.save();
  return user.cart;
}

export async function removeFromCart(userId, itemId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.cart = user.cart.filter(ci => ci.itemId.toString() !== itemId);

  await user.save();
  return user.cart;
}

export async function getCart(userId) {
  const user = await User.findById(userId).populate("cart.itemId");
  if (!user) throw new Error("User not found");
  return user.cart;
}
