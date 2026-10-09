import type { Category, Product } from '../data/products'

export type SortOrder = 'featured' | 'price-low' | 'price-high'

export function filterProducts(
  products: Product[],
  category: Category | 'All',
  query: string,
  sort: SortOrder,
) {
  const search = query.trim().toLocaleLowerCase()
  const result = products.filter(
    (product) =>
      (category === 'All' || product.category === category) &&
      `${product.name} ${product.category} ${product.description} ${product.specs.join(' ')}`
        .toLocaleLowerCase()
        .includes(search),
  )
  if (sort === 'price-low') result.sort((a, b) => a.price - b.price)
  if (sort === 'price-high') result.sort((a, b) => b.price - a.price)
  return result
}

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat('en-US').format(price)} MAD`
}
