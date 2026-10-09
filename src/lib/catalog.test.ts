import { describe, expect, it } from 'vitest'
import { products } from '../data/products'
import { filterProducts, formatPrice } from './catalog'

describe('the product collection', () => {
  it('combines category and case-insensitive specification searches', () => {
    const result = filterProducts(products, 'Laptops', '  16 GB  ', 'featured')
    expect(result.map((product) => product.id)).toEqual(['everyday-14'])
  })

  it('sorts prices without mutating the source catalogue', () => {
    const original = products.map((product) => product.id)
    const low = filterProducts(products, 'All', '', 'price-low')
    const high = filterProducts(products, 'All', '', 'price-high')
    expect(low[0].id).toBe('go-mouse')
    expect(high[0].id).toBe('studiobook-15')
    expect(products.map((product) => product.id)).toEqual(original)
  })

  it('returns no results when the selected category does not match a query', () => {
    expect(filterProducts(products, 'Desktops', 'wireless keyboard', 'featured')).toEqual([])
  })

  it('labels sample prices with MAD', () => {
    expect(formatPrice(5490)).toBe('5,490 MAD')
  })
})
