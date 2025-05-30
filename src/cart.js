import { isCartItem, isProduct } from "./validation.js"

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
    if (!isProduct(newItem)) {
    throw new Error("Ogiltig produkt")
    }
  }
  // se om en produkt med samma id redan finns i kundvagnen, annars lägger till eller +1
  const newId = idCounter;
  const index = cart.findIndex((item) => item.id === newId);

  if (index === -1) {
    const cartItem = { id: idCounter, amount: 1, item: newItem };
    idCounter++;
    cart.push(cartItem);
  } else {
    cart[index].amount++;
  }
}

//tar bort produkt från kundvagnen baserat på id
function removeFromCart(itemId) {
  const initialLength = cart.length
  cart = cart.filter(item => item.id !== itemId)
  if (cart.length === initialLength) {
  throw new Error("Produkten finns inte i kundvagnen")
}

}
//kollar om prdukt finns och antal är ett nummer
function editCart(itemId, newValues) {
  const item = cart.find(i => i.id === itemId)
  if (!item) throw new Error("Kundvagnsprodukt hittades inte")
  if (typeof newValues.amount !== 'number') {
    throw new Error("Ogiltigt antal")
  }
  item.amount = newValues.amount
}

// Tömmer hela kundkorgen
function clearCart() {
  cart = []
  idCounter = 2002
}

export {getCartItemCount, getItem, getTotalCartValue, addToCart, removeFromCart, editCart, clearCart}

