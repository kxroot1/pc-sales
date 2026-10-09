import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/dm-sans/latin-600.css'
import '@fontsource/dm-sans/latin-700.css'
import App from './App'
import { business } from './config/business'
import './styles.css'

document.title = `${business.name} — ${business.tagline}`
document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    'content',
    `Meet ${business.name}: a fictional local tech shop demo in ${business.country}. Explore sample laptops, desktops, and accessories with prices in MAD.`,
  )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
