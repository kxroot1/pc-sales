export type Category = 'Laptops' | 'Desktops' | 'Accessories'
export type Artwork = 'laptop' | 'desktop' | 'monitor' | 'keyboard' | 'mouse'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  description: string
  specs: string[]
  artwork: Artwork
  color: string
  background: string
  label: string
}

/** Fictional models, illustrative specifications, and sample MAD prices. */
export const products: Product[] = [
  {
    id: 'everyday-14',
    name: 'Everyday 14',
    category: 'Laptops',
    price: 5490,
    description:
      'A light, easygoing laptop for notes, spreadsheets, and everything between. Your daily routine, with a little more room to move.',
    specs: ['14-inch Full HD display', '16 GB memory', '512 GB SSD', 'USB-C charging'],
    artwork: 'laptop',
    color: '#aebcb7',
    background: '#e9ede8',
    label: 'The everyday pick',
  },
  {
    id: 'studiobook-15',
    name: 'StudioBook 15',
    category: 'Laptops',
    price: 7990,
    description:
      'Space for your next big idea. An illustrative creative-work laptop with a larger display and room for all your projects.',
    specs: ['15.6-inch Full HD display', '32 GB memory', '1 TB SSD', 'Backlit keyboard'],
    artwork: 'laptop',
    color: '#4c545c',
    background: '#ece8e2',
    label: 'Room to create',
  },
  {
    id: 'mini-one',
    name: 'Mini One',
    category: 'Desktops',
    price: 3690,
    description:
      'A tidy little desktop for a calmer workspace. Pair it with your favourite screen and make yourself at home.',
    specs: ['Compact desktop', '16 GB memory', '512 GB SSD', 'Wi-Fi & Bluetooth'],
    artwork: 'desktop',
    color: '#bcc4c8',
    background: '#e8eced',
    label: 'Small space, big ideas',
  },
  {
    id: 'focus-24',
    name: 'Focus 24',
    category: 'Accessories',
    price: 1890,
    description:
      'Give your tabs some breathing room. An everyday monitor that makes a small desk feel a little bigger.',
    specs: ['24-inch Full HD display', 'IPS panel', 'HDMI connection', 'Adjustable tilt'],
    artwork: 'monitor',
    color: '#3d4846',
    background: '#eeede5',
    label: 'A fresh perspective',
  },
  {
    id: 'quiet-keys',
    name: 'Quiet Keys',
    category: 'Accessories',
    price: 490,
    description:
      'A clean, comfortable keyboard for emails, essays, and good ideas. Simple tools can make a lovely difference.',
    specs: ['Compact wireless keyboard', 'Quiet keys', 'USB receiver', 'French AZERTY layout'],
    artwork: 'keyboard',
    color: '#deded0',
    background: '#eaece3',
    label: 'Less noise, more flow',
  },
  {
    id: 'go-mouse',
    name: 'Go Mouse',
    category: 'Accessories',
    price: 190,
    description:
      'A small companion for wherever you work. A simple wireless mouse with a comfortable, everyday shape.',
    specs: ['Wireless connection', 'USB receiver', 'Three buttons', 'Battery powered'],
    artwork: 'mouse',
    color: '#b36c4e',
    background: '#f0e7df',
    label: 'Take it anywhere',
  },
]
