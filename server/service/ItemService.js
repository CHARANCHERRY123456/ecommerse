import Item from "../models/Item.js";

export async function createItem(data) {
  return await Item.create(data);
}

export async function getItems({ category, minPrice, maxPrice }) {
  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  return await Item.find(filter);
}

export async function getItemById(id) {
  return await Item.findById(id);
}

export async function updateItem(id, data) {
  // new : true return the updated doc
  return await Item.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteItem(id) {
  return await Item.findByIdAndDelete(id);
}
