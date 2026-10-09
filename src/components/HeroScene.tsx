import { ArrowUpRight, Sparkles } from 'lucide-react'
import { ProductArt } from './ProductArt'

export function HeroScene() {
  return (
    <div
      className="hero-scene"
      role="img"
      aria-label="Original illustration of a silver laptop with an abstract green and peach screen, on a warm studio background"
    >
      <div className="scene-grid" />
      <span className="scene-orbit orbit-one" />
      <span className="scene-orbit orbit-two" />
      <span className="scene-spark spark-one">
        <Sparkles size={31} strokeWidth={1.4} />
      </span>
      <div className="scene-label">
        <span className="tiny-dot" /> A FRESH START
      </div>
      <div className="scene-pedestal" />
      <ProductArt kind="laptop" hero color="#c5cdc4" />
      <div className="scene-sticker">
        Less friction.
        <br />
        <strong>More possibility.</strong>
        <span>↗</span>
      </div>
      <div className="scene-product">
        <div>
          <span>MEET YOUR EVERYDAY</span>
          <strong>Everyday 14</strong>
        </div>
        <ArrowUpRight size={22} />
      </div>
      <span className="scene-caption">Thoughtfully chosen. Simply yours.</span>
    </div>
  )
}
