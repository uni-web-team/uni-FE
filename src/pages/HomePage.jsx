import { useNavigate } from 'react-router-dom';
import UniLogo from '../components/UniLogo';

const CARD = {
  background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(120,160,100,0.25)',
  borderRadius: 22, padding: '26px 22px',
  boxShadow: '0 4px 20px rgba(80,130,90,0.1)',
  cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
};

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <UniLogo size={90} radius={24} />
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: '#3A5240', fontFamily: "'Nanum Gothic', sans-serif", lineHeight: 1.3 }}>
          <span style={{ color: '#8BB4D4' }}>u</span><span style={{ color: '#D4B86A' }}>n</span><span style={{ color: '#7BAE8B' }}>i</span>에 오신 걸 환영해요 💚
        </h1>
        <p style={{ fontSize: 15, color: '#6A8270', marginTop: 14, lineHeight: 1.8 }}>
          비장애 형제들이 함께 모여<br />고민을 나누고 서로를 응원하는 공간이에요.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 22 }}>
        {[
          { icon: '📮', title: '익명우편소', desc: '마음속 고민을 익명으로 털어놓아요. 따뜻한 답장이 도착할 거예요.', badge: '고민 보내기 →', badgeStyle: { background: 'linear-gradient(135deg,#7BAE8B,#9DCFBA)', color: '#fff' }, path: '/mail' },
          { icon: '💬', title: '커뮤니티', desc: '비장애 형제 친구들과 자유롭게 이야기를 나눠요.', badge: '게시판 보기 →', badgeStyle: { background: 'linear-gradient(135deg,#E8C96A,#F5D5B0)', color: '#5A4A20' }, path: '/community' },
        ].map(c => (
          <div key={c.path} style={CARD} onClick={() => navigate(c.path)}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(80,130,90,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = CARD.boxShadow; }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>{c.icon}</div>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: '#3A5240', fontFamily: "'Nanum Gothic', sans-serif", marginBottom: 8 }}>{c.title}</h2>
            <p style={{ fontSize: 13, color: '#6A8270', lineHeight: 1.7 }}>{c.desc}</p>
            <div style={{ marginTop: 18, display: 'inline-block', padding: '6px 16px', borderRadius: 9999, fontSize: 12, fontWeight: 700, ...c.badgeStyle }}>{c.badge}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(120,160,100,0.2)', borderRadius: 16, padding: '16px 20px', fontSize: 13, color: '#6A8270', lineHeight: 1.8 }}>
        💡 <strong style={{ color: '#4A7A5A' }}>모든 게시글과 댓글은 익명</strong>으로 작성돼요.<br />욕설 및 비방 글은 삭제될 수 있습니다.
      </div>
    </div>
  );
}
