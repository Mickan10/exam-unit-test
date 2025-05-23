function isProduct(maybeProduct) {

  if (typeof maybeProduct !== 'object' || maybeProduct === null) return false

  if (
    typeof maybeProduct.id === 'number' &&
    typeof maybeProduct.name === 'string' &&
    typeof maybeProduct.price === 'number'
  ) {
    return true
  }

  return false
}

function isCartItem(maybeCartItem) {
  if (typeof maybeCartItem !== 'object' || maybeCartItem === null) return false

  if (typeof maybeCartItem.id !== 'number') return false

  if (typeof maybeCartItem.amount !== 'number') return false

  if (!isProduct(maybeCartItem.item)) return false

  return true
}

export { isCartItem, isProduct }

