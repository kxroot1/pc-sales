import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Laptop,
  Monitor,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { products, type Category, type Product } from '../data/products'
import { filterProducts, formatPrice, type SortOrder } from '../lib/catalog'
import { ProductArt } from './ProductArt'

export function Catalog({ onEnquire }: { onEnquire: (product: string) => void }) {
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortOrder>('featured')
  const [selected, setSelected] = useState<Product | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)
  const visible = useMemo(
    () => filterProducts(products, category, query, sort),
    [category, query, sort],
  )

  useEffect(() => {
    if (selected) dialog.current?.showModal()
    else dialog.current?.close()
  }, [selected])

  useEffect(() => {
    if (!selected) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [selected])

  function closeDetails() {
    setSelected(null)
    lastTrigger.current?.focus()
  }

  const categories = ['All', 'Laptops', 'Desktops', 'Accessories'] as const
  return (
    <section
      className="section collection-section"
      id="collection"
      aria-labelledby="collection-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span /> THE GOOD STUFF
            </p>
            <h2 id="collection-title">Meet your next essential.</h2>
          </div>
          <p>
            For the big ideas and the everyday things.
            <br />A small collection with a lot of possibility.
          </p>
        </div>
        <div className="catalog-toolbar">
          <div className="category-tabs" role="group" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={category === item ? 'active' : ''}
              >
                {item === 'All' ? 'All essentials' : item}
                {item === 'Laptops' && <Laptop size={15} />}
                {item === 'Desktops' && <Monitor size={15} />}
              </button>
            ))}
          </div>
          <div className="catalog-controls">
            <label className="search-field">
              <Search size={17} />
              <span className="sr-only">Search products</span>
              <input
                type="search"
                placeholder="Find your fit…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <label className="sort-field">
              <SlidersHorizontal size={16} />
              <span className="sr-only">Sort products</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as SortOrder)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>
        </div>
        <p className="catalog-count" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'essential' : 'essentials'}{' '}
          <span>· Sample prices in MAD</span>
        </p>
        {visible.length ? (
          <div className="product-grid">
            {visible.map((product) => (
              <article className="product-card" key={product.id}>
                <button
                  className="product-visual"
                  style={{ background: product.background }}
                  aria-label={`View details for ${product.name}`}
                  onClick={(event) => {
                    lastTrigger.current = event.currentTarget
                    setSelected(product)
                  }}
                >
                  <span className="product-tag">{product.label}</span>
                  <ProductArt kind={product.artwork} color={product.color} />
                  <span className="product-view" aria-hidden="true">
                    <ArrowUpRight size={19} />
                  </span>
                </button>
                <div className="product-info">
                  <p className="product-category">{product.category}</p>
                  <div className="product-name-row">
                    <h3>{product.name}</h3>
                    <p className="product-price">{formatPrice(product.price)}</p>
                  </div>
                  <p className="product-specs">{product.specs.slice(0, 3).join(' · ')}</p>
                  <button className="product-enquire" onClick={() => onEnquire(product.name)}>
                    Ask about this <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={30} />
            <h3>No essentials found.</h3>
            <p>Try another search or explore the whole collection.</p>
            <button
              className="button button-dark"
              onClick={() => {
                setCategory('All')
                setQuery('')
                setSort('featured')
              }}
            >
              Reset filters <ArrowRight size={17} />
            </button>
          </div>
        )}
        <div className="collection-note">
          <span>
            <Check size={16} /> A considered collection. Advice without the jargon.
          </span>
          <a href="#contact">
            Not sure where to start? Let’s chat <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="product-dialog"
        aria-labelledby="product-dialog-title"
        onCancel={closeDetails}
        onClose={() => {
          if (selected) closeDetails()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDetails()
        }}
      >
        {selected && (
          <>
            <button
              className="dialog-close icon-button"
              onClick={closeDetails}
              aria-label="Close product details"
              autoFocus
            >
              <X />
            </button>
            <div className="dialog-art" style={{ background: selected.background }}>
              <ProductArt kind={selected.artwork} color={selected.color} />
            </div>
            <div className="dialog-content">
              <p className="eyebrow">{selected.category} · FICTIONAL MODEL</p>
              <h2 id="product-dialog-title">{selected.name}</h2>
              <p>{selected.description}</p>
              <ul className="spec-list">
                {selected.specs.map((spec) => (
                  <li key={spec}>
                    <Check size={17} />
                    {spec}
                  </li>
                ))}
              </ul>
              <p className="dialog-price">
                {formatPrice(selected.price)} <span>sample price</span>
              </p>
              <p className="fine-print">
                Illustrative specifications. Ask for current pricing and availability.
              </p>
              <button
                className="button button-dark"
                onClick={() => {
                  const name = selected.name
                  closeDetails()
                  onEnquire(name)
                }}
              >
                Enquire about {selected.name} <ArrowUpRight size={18} />
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  )
}
