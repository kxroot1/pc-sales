import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Copy, MessageCircle } from 'lucide-react'
import { business } from '../config/business'
import { products } from '../data/products'
import {
  createEnquiryMessage,
  createWhatsAppUrl,
  normalizeWhatsAppNumber,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from '../lib/enquiry'

export function EnquiryForm({
  selection,
}: {
  selection: { name: string; version: number } | null
}) {
  const [values, setValues] = useState<Enquiry>({ name: '', interest: '', message: '' })
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [prepared, setPrepared] = useState<{ values: Enquiry; url: string | null } | null>(null)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle')
  const nameInput = useRef<HTMLInputElement>(null)
  const interestInput = useRef<HTMLSelectElement>(null)
  const messageInput = useRef<HTMLTextAreaElement>(null)
  const configured = Boolean(normalizeWhatsAppNumber(business.whatsappNumber))

  useEffect(() => {
    if (!selection) return
    setValues((previous) => ({ ...previous, interest: selection.name }))
    setPrepared(null)
    setCopyStatus('idle')
    setErrors((previous) => ({ ...previous, interest: undefined }))
    nameInput.current?.focus({ preventScroll: true })
  }, [selection])

  function update(key: keyof Enquiry, value: string) {
    setValues((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: undefined }))
    setPrepared(null)
    setCopyStatus('idle')
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = validateEnquiry(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setPrepared(null)
      if (nextErrors.name) nameInput.current?.focus()
      else if (nextErrors.interest) interestInput.current?.focus()
      else messageInput.current?.focus()
      return
    }
    const url = createWhatsAppUrl(business.whatsappNumber, business.name, values)
    setCopyStatus('idle')
    setPrepared({ values: { ...values }, url })
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  const draft = prepared ? createEnquiryMessage(business.name, prepared.values) : ''

  async function copyMessage() {
    setCopyStatus('copying')
    try {
      await navigator.clipboard.writeText(draft)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
  }

  return (
    <form className="enquiry-form" onSubmit={submit} noValidate aria-label="Product enquiry">
      <div className="form-heading">
        <MessageCircle size={22} />
        <div>
          <h3>A good conversation starts here.</h3>
          <p>Tell us what you have in mind.</p>
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="enquiry-name">
            Your name <span>(required)</span>
          </label>
          <input
            ref={nameInput}
            id="enquiry-name"
            name="name"
            autoComplete="name"
            placeholder="What should we call you?"
            value={values.name}
            maxLength={80}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            onChange={(event) => update('name', event.target.value)}
          />
          {errors.name && (
            <p className="field-error" id="name-error">
              {errors.name}
            </p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-interest">
            I’m interested in <span>(required)</span>
          </label>
          <select
            ref={interestInput}
            id="enquiry-interest"
            name="interest"
            value={values.interest}
            required
            aria-invalid={Boolean(errors.interest)}
            aria-describedby={errors.interest ? 'interest-error' : undefined}
            onChange={(event) => update('interest', event.target.value)}
          >
            <option value="">Choose an essential</option>
            <option value="General advice">A little help choosing</option>
            {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          {errors.interest && (
            <p className="field-error" id="interest-error">
              {errors.interest}
            </p>
          )}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="enquiry-message">
          A little about what you need <span>(required)</span>
        </label>
        <textarea
          ref={messageInput}
          id="enquiry-message"
          name="message"
          rows={4}
          placeholder="Your budget, how you’ll use it, or anything you’d like to ask…"
          value={values.message}
          maxLength={1000}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={`message-hint${errors.message ? ' message-error' : ''}`}
          onChange={(event) => update('message', event.target.value)}
        />
        <div className="field-hint" id="message-hint">
          <span>10–1,000 characters. Keep personal details out.</span>
          <span>{values.message.length}/1000</span>
        </div>
        {errors.message && (
          <p className="field-error" id="message-error">
            {errors.message}
          </p>
        )}
      </div>
      <button className="button button-dark form-submit" type="submit">
        Let’s chat on WhatsApp <ArrowUpRight size={19} />
      </button>
      <p className="form-privacy">
        Your message opens in WhatsApp. Nothing is stored on this website.
      </p>
      {!configured && (
        <p className="demo-notice">
          <span>DEMO NOTE</span> A WhatsApp number hasn’t been configured. You can still prepare and
          copy your message.
        </p>
      )}
      {prepared && (
        <div className="prepared-message">
          <p className="prepared-title" role="status">
            <Check size={18} />
            {prepared.url
              ? 'Your message is ready. Finish sending in WhatsApp.'
              : 'Demo message prepared. Nothing has been sent.'}
          </p>
          {!prepared.url && (
            <p>
              Add your business number in <code>src/config/business.ts</code> to enable WhatsApp.
            </p>
          )}
          <pre tabIndex={0} aria-label="Prepared WhatsApp message">
            {draft}
          </pre>
          <div className="prepared-actions">
            {prepared.url && (
              <a
                className="text-link"
                href={prepared.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open WhatsApp <ArrowUpRight size={16} />
              </a>
            )}
            <button
              type="button"
              className="copy-button"
              onClick={copyMessage}
              disabled={copyStatus === 'copying'}
            >
              {copyStatus === 'copied' ? <Check size={16} /> : <Copy size={16} />}
              {copyStatus === 'copying'
                ? 'Copying…'
                : copyStatus === 'copied'
                  ? 'Copied'
                  : 'Copy message'}
            </button>
          </div>
          <p className="copy-feedback" role="status">
            {copyStatus === 'failed'
              ? 'Copy isn’t available here. Select and copy the message above.'
              : copyStatus === 'copied'
                ? 'Message copied to your clipboard.'
                : ''}
          </p>
        </div>
      )}
    </form>
  )
}
