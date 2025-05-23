import { isCartItem, isProduct } from "../validation.js"

const exampleProduct = {
	id: 1001,
	name: 'Badanka',
	price: 500
}

const exampleCartObject = {
	id: 2001,
	amount: 1,
	item: exampleProduct
}

//testfall
describe('Validation', () => {
	test ('ska ge true för en giltig produkt', () => {
		expect(isProduct(exampleProduct)).toBe(true)
	})

	test('ska ge false om produktens namn saknas', () => {
		const invalidProduct = { id: 1002, price: 200 }
		expect(isProduct(invalidProduct)).toBe(false)
	})

	test('ska ge true för en giltig vara i kundvagnen', () => {
		expect(isCartItem(exampleCartObject)).toBe(true)
	})

	test('ska ge false om antal saknas i kundvagnen', () => {
		const invalidCart = {
			id: 2002,
			item: exampleProduct 
		}
		expect(isCartItem(invalidCart)).toBe(false)
	})

})

