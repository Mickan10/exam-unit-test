import { isProduct } from "./validation.js"

let cart = []
let idCounter = 2002

// Returnerar antal produkter i kundvagnen
function getCartItemCount() {
  return cart.length
}

// Returnerar ett objekt i kundvagnen baserat på index
function getItem(index) {
  return cart[index]
}

// Returnerar totalvärdet för varukorgen
function getTotalCartValue() {
  return cart.reduce((total, cartItem) => {
    return total + cartItem.item.price * cartItem.amount
  }, 0)
}

// Lägger till ny produkt om den är giltig, annars ger fel
function addToCart(newItem) {
  if (!isProduct(newItem)) {
    throw new Error("Ogiltig produkt")
  }

  const cartItem = {
    id: idCounter++,
    amount: 1,
    item: newItem
  }

  cart.push(cartItem)
}

// Tar bort produkt från kundvagnen baserat på ID
function removeFromCart(itemId) {
  const initialLength = cart.length
  cart = cart.filter(item => item.id !== itemId)

  if (cart.length === initialLength) {
    throw new Error("Produkten finns inte i kundvagnen")
  }
}

// Uppdaterar antal för en produkt i kundvagnen
function editCart(itemId, newValues) {
  const item = cart.find(i => i.id === itemId)
  if (!item) {
    throw new Error("Kundvagnsprodukt hittades inte")
  }
  if (typeof newValues.amount !== 'number') {
    throw new Error("Ogiltigt antal")
  }
  item.amount = newValues.amount
}

// Tömmer hela kundvagnen
function clearCart() {
  cart = []
  idCounter = 2002
}

export {getCartItemCount, getItem, getTotalCartValue, addToCart, removeFromCart, editCart, clearCart}

