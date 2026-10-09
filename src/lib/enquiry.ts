export interface Enquiry {
  name: string
  interest: string
  message: string
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>

export function validateEnquiry(values: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).'
  else if (values.name.trim().length > 80)
    errors.name = 'Please keep your name under 80 characters.'
  if (!values.interest.trim()) errors.interest = 'Choose a product or general advice.'
  if (values.message.trim().length < 10)
    errors.message = 'Tell us a little more (at least 10 characters).'
  else if (values.message.trim().length > 1000)
    errors.message = 'Please keep your message under 1,000 characters.'
  return errors
}

export function normalizeWhatsAppNumber(number: string): string | null {
  // Accept a real international number with optional spaces, parentheses, or hyphens.
  // Reject placeholders, letters, local-only numbers, and invalid punctuation.
  const trimmed = number.trim()
  if (!/^\+?[1-9][\d\s()-]*$/.test(trimmed)) return null
  const digits = trimmed.replace(/[\s()+-]/g, '')
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : null
}

export function createEnquiryMessage(businessName: string, enquiry: Enquiry): string {
  return [
    `Hello ${businessName}!`,
    `My name is ${enquiry.name.trim()}.`,
    `I'm interested in: ${enquiry.interest.trim()}.`,
    '',
    enquiry.message.trim(),
    '',
    'Could you share availability and a current quote? Thank you!',
  ].join('\n')
}

export function createWhatsAppUrl(
  number: string,
  businessName: string,
  enquiry: Enquiry,
): string | null {
  const normalized = normalizeWhatsAppNumber(number)
  if (!normalized || Object.keys(validateEnquiry(enquiry)).length) return null
  return `https://wa.me/${normalized}?text=${encodeURIComponent(createEnquiryMessage(businessName, enquiry))}`
}

export function safeSocialUrl(value: string): string | null {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}
