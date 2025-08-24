import Link from 'next/link'
import { apiGet } from './lib/api'

export default async function Home() {
  const data = await apiGet<{ status: string, data: Array<{id:number, name:string}> }>('/affiliates')
  const affiliates = data.data

  return (
    <div>
      <h2>Choose Affiliate (Login Simulation)</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {affiliates.map(a => (
          <li key={a.id} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ background: '#222', border: '1px solid #333', borderRadius: 8, padding: '6px 10px' }}>{a.name}</span>
              <Link href={`/dashboard/${a.id}`} style={{ color: '#9cf' }}>Open Dashboard</Link>
              <Link href={`/postback/${a.id}`} style={{ color: '#9cf' }}>Postback URL</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
