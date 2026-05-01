import { useState } from 'react';

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [mails, setMails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleFetch() {
    if (!key.trim()) { setError('관리자 키를 입력해주세요'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/mail', { headers: { 'X-Admin-Key': key.trim() } });
      if (res.status === 403) { setError('관리자 키가 올바르지 않아요'); setMails(null); return; }
      const data = await res.json();
      setMails(data);
    } catch {
      setError('서버 연결에 실패했어요');
    } finally {
      setLoading(false);
    }
  }

  const card = {
    background: 'rgba(255,255,255,0.68)', backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(120,160,100,0.22)',
    borderRadius: 22, padding: '28px 26px',
    boxShadow: '0 4px 24px rgba(80,130,90,0.1)',
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: '#3A5240', marginBottom: 24, fontFamily: "'Nanum Gothic', sans-serif" }}>
        📮 익명우편소 관리자
      </h1>

      <div style={{ ...card, marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#6A8270', marginBottom: 8 }}>관리자 키</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="password"
            value={key}
            onChange={e => setKey(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleFetch()}
            placeholder="관리자 키를 입력하세요"
            style={{
              flex: 1, padding: '11px 18px',
              border: '1.5px solid rgba(120,160,100,0.3)',
              borderRadius: 9999, fontSize: 14,
              background: 'rgba(255,255,255,0.65)', color: '#3A5240', outline: 'none',
              fontFamily: "'Gowun Dodum', sans-serif",
            }}
          />
          <button
            onClick={handleFetch}
            disabled={loading}
            style={{
              padding: '11px 28px', borderRadius: 9999,
              background: 'linear-gradient(135deg,#7BAE8B,#9DCFBA)',
              color: '#fff', border: 'none', fontSize: 14, fontWeight: 700,
              fontFamily: "'Nanum Gothic', sans-serif", cursor: 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? '조회 중...' : '조회'}
          </button>
        </div>
        {error && (
          <div style={{ marginTop: 10, fontSize: 13, color: '#E05555', paddingLeft: 4 }}>{error}</div>
        )}
      </div>

      {mails && (
        <div style={card}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#3A5240', marginBottom: 16, fontFamily: "'Nanum Gothic', sans-serif" }}>
            총 {mails.total}건의 우편
          </div>
          {mails.total === 0 && (
            <p style={{ color: '#92A898', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>
              아직 접수된 우편이 없어요 🌿
            </p>
          )}
          {mails.mails.map((mail, i) => (
            <div key={mail.id} style={{
              padding: '16px 0',
              borderBottom: i < mails.mails.length - 1 ? '1px solid rgba(120,160,100,0.15)' : 'none',
            }}>
              <div style={{ fontSize: 12, color: '#92A898', marginBottom: 6 }}>
                #{mail.id} · {mail.date}
              </div>
              <p style={{ fontSize: 14, color: '#3A5240', lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>
                {mail.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
