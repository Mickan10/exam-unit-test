import {addToCart, getCartItemCount, clearCart, editCart, removeFromCart, getTotalCartValue, getItem} from "../cart"

describe('Cart', () => {
  beforeEach(() => {
    clearCart()
  })

  // testfall
  test('addToCart lägger till en ny produkt i kundvagnen', () => {
    const input = { id: 1002, name: 'Vattenpistol', price: 40 }
    addToCart(input)
    expect(getCartItemCount()).toBe(1)
  })

  test('getItem returnerar rätt objekt från kundvagnen', () => {
    addToCart({ id: 1003, name: 'Badboll', price: 20 })
    const item = getItem(0)
    expect(item.item.name).toBe('Badboll')
  })

  test('getTotalCartValue returnerar korrekt totalsumma', () => {
    addToCart({ id: 1001, name: 'Anka', price: 100 })
    addToCart({ id: 1002, name: 'Boll', price: 200 }) 
    expect(getTotalCartValue()).toBe(300)
  })

  test('removeFromCart tar bort rätt vara', () => {
    addToCart({ id: 1004, name: 'Snorkel', price: 80 })
    const item = getItem(0)
    removeFromCart(item.id)
    expect(getCartItemCount()).toBe(0)
  })

  test('editCart ändrar mängden av en vara', () => {
    addToCart({ id: 1005, name: 'Flytväst', price: 300 })
    const item = getItem(0)
    editCart(item.id, { amount: 3 })
    const updatedItem = getItem(0)
    expect(updatedItem.amount).toBe(3)
  })

  test('clearCart tömmer hela kundvagnen', () => {
    addToCart({ id: 1006, name: 'Glass', price: 25 })
    addToCart({ id: 1007, name: 'Solkräm', price: 50 })
    clearCart()
    expect(getCartItemCount()).toBe(0)
  })

  // testfall för felhantering
  test('addToCart kastar fel vid ogiltig produkt (saknar namn)', () => {
    expect(() => {
      addToCart({ id: 2001, price: 50 })
    }).toThrow("Ogiltig produkt")
  })

  test('addToCart kastar fel vid ogiltig produkt (fel typ på pris)', () => {
    expect(() => {
      addToCart({ id: 2002, name: "Fisk", price: "gratis" })
    }).toThrow("Ogiltig produkt")
  })

  test('editCart kastar fel om ID inte finns', () => {
    expect(() => {
      editCart(9999, { amount: 2 })
    }).toThrow("Kundvagnsprodukt hittades inte")
  })

  test('editCart kastar fel om amount är ogiltigt (text)', () => {
    addToCart({ id: 1008, name: "Simring", price: 90 })
    const item = getItem(0)
    expect(() => {
      editCart(item.id, { amount: "två" })
    }).toThrow("Ogiltigt antal")
  })

  test('removeFromCart kastar fel om produkten inte finns', () => {
    expect(() => {
      removeFromCart(9999)
    }).toThrow("Produkten finns inte i kundvagnen")
  })

  test('getItem returnerar undefined om index är utanför arrayen', () => {
    expect(getItem(0)).toBeUndefined()
  })
})
