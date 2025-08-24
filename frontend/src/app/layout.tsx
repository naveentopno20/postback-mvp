export const metadata = { title: 'Affiliate Dashboard' }
import React from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: 20, background: '#0b0b0b', color: '#f0f0f0' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h1 style={{ marginBottom: 8 }}>Affiliate Dashboard (MVP)</h1>
          <p style={{ marginTop: 0, opacity: 0.8 }}>S2S Postback tracking with PostgreSQL</p>
          <hr style={{ borderColor: '#333' }} />
          {children}
        </div>
      </body>
    </html>
  )
}
