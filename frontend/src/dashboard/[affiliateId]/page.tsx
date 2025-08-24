"use client";

import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Dashboard({ params }: { params: { affiliateId: string } }) {
  const { affiliateId } = params;
  const [clicks, setClicks] = useState<any[]>([]);
  const [conversions, setConversions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [clicksRes, conversionsRes] = await Promise.all([
          apiGet(`/affiliates/${affiliateId}/clicks`),
          apiGet(`/affiliates/${affiliateId}/conversions`),
        ]);
        setClicks(clicksRes.data);
        setConversions(conversionsRes.data);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [affiliateId]);

  if (loading) return <p>Loading dashboard...</p>;

  const total = conversions.reduce((sum, c) => sum + Number(c.amount), 0);


  return (
    <div>
      <h2>Affiliate #{affiliateId} – Dashboard</h2>
      <section>
        <h3>Metrics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <div style={{ background: '#141414', border: '1px solid #333', borderRadius: 12, padding: 12 }}>
            <div style={{ opacity: .7 }}>Clicks</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{clicks.length}</div>
          </div>
          <div style={{ background: '#141414', border: '1px solid #333', borderRadius: 12, padding: 12 }}>
            <div style={{ opacity: .7 }}>Conversions</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{conversions.length}</div>
          </div>
          <div style={{ background: '#141414', border: '1px solid #333', borderRadius: 12, padding: 12 }}>
            <div style={{ opacity: .7 }}>Revenue</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>${total.toFixed(2)}</div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Clicks</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #333', padding: 8 }}>Click Code</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #333', padding: 8 }}>Campaign</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #333', padding: 8 }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {clicks.map((c: any) => (
              <tr key={c.id}>
                <td style={{ padding: 8, borderBottom: '1px solid #222' }}>{c.click_id}</td>
                <td style={{ padding: 8, borderBottom: '1px solid #222' }}>{c.campaign_name} (#{c.campaign_id})</td>
                <td style={{ padding: 8, borderBottom: '1px solid #222' }}>{new Date(c.ts).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Conversions</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #333', padding: 8 }}>Amount</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #333', padding: 8 }}>Currency</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #333', padding: 8 }}>Click Code</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #333', padding: 8 }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {conversions.map((v: any) => (
              <tr key={v.id}>
                <td style={{ padding: 8, borderBottom: '1px solid #222' }}>{Number(v.amount).toFixed(2)}</td>
                <td style={{ padding: 8, borderBottom: '1px solid #222' }}>{v.currency}</td>
                <td style={{ padding: 8, borderBottom: '1px solid #222' }}>{v.click_code}</td>
                <td style={{ padding: 8, borderBottom: '1px solid #222' }}>{new Date(v.ts).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
