import Link from 'next/link'
import { API_BASE } from '../../lib/api'

export default function PostbackUrl({ params }: { params: { affiliateId: string } }) {
  const { affiliateId } = params
  const template = `${API_BASE}/postback?affiliate_id={id}&click_id={click_id}&amount={amount}&currency={currency}`
  const example = `${API_BASE}/postback?affiliate_id=${affiliateId}&click_id=abc123&amount=100&currency=USD`

  return (
    <div>
      <h2>Affiliate #{affiliateId} – Postback URL</h2>
      <p>Give this format to your advertiser so they can notify conversions:</p>
      <pre style={{ background: '#141414', padding: 12, borderRadius: 8, border: '1px solid #333', overflowX: 'auto' }}>
        {template}
      </pre>
      <p>Example for your account:</p>
      <pre style={{ background: '#141414', padding: 12, borderRadius: 8, border: '1px solid #333', overflowX: 'auto' }}>
        {example}
      </pre>
      <p><Link href={`/dashboard/${affiliateId}`} style={{ color: '#9cf' }}>Back to Dashboard</Link></p>
    </div>
  )
}
