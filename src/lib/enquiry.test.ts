import { describe, expect, it } from 'vitest'
import { business } from '../config/business'
import {
  createWhatsAppUrl,
  normalizeWhatsAppNumber,
  safeSocialUrl,
  validateEnquiry,
} from './enquiry'

const enquiry = {
  name: '  Amine  ',
  interest: 'Everyday 14',
  message: 'Looking for a laptop for study & design. Budget: 6,000 MAD.',
}

describe('WhatsApp enquiries', () => {
  it('reports missing fields and rejects whitespace-only or overly long values', () => {
    expect(Object.keys(validateEnquiry({ name: ' ', interest: '', message: 'short' }))).toEqual([
      'name',
      'interest',
      'message',
    ])
    expect(
      validateEnquiry({ ...enquiry, name: 'a'.repeat(81), message: 'a'.repeat(1001) }),
    ).toHaveProperty('message')
    expect(validateEnquiry(enquiry)).toEqual({})
  })

  it('never creates a link for a placeholder, local-only number, or invalid punctuation', () => {
    for (const number of [
      business.whatsappNumber,
      '',
      '0612345678',
      '123',
      '+212<script>123',
      '1234567890123456',
      'whatsapp12345678',
    ]) {
      expect(normalizeWhatsAppNumber(number)).toBeNull()
      expect(createWhatsAppUrl(number, 'Demo', enquiry)).toBeNull()
    }
  })

  it('normalizes international formatting and safely encodes user content', () => {
    // Synthetic digits for a unit test only; never used as demo contact information.
    const url = createWhatsAppUrl('+123 (456) 789-01', 'Demo', enquiry)
    expect(url).not.toBeNull()
    const parsed = new URL(url!)
    expect(parsed.origin).toBe('https://wa.me')
    expect(parsed.pathname).toBe('/12345678901')
    expect(parsed.searchParams.get('text')).toContain('My name is Amine.')
    expect(parsed.searchParams.get('text')).toContain('study & design')
    expect([...parsed.searchParams.keys()]).toEqual(['text'])
  })

  it('does not generate a URL for an invalid message even with a configured number', () => {
    expect(createWhatsAppUrl('12345678901', 'Demo', { ...enquiry, message: '' })).toBeNull()
  })
})

describe('social links', () => {
  it('only enables configured HTTPS links', () => {
    expect(safeSocialUrl('YOUR_INSTAGRAM_URL')).toBeNull()
    expect(safeSocialUrl('javascript:alert(1)')).toBeNull()
    expect(safeSocialUrl('http://example.com')).toBeNull()
    expect(safeSocialUrl('https://example.com/shop')).toBe('https://example.com/shop')
  })
})
