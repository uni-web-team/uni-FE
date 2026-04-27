import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UniLogo from './UniLogo';
import { useAuth } from '../hooks/useAuth';

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isLoggedIn } = useAuth();

  const isActive = (path) => location.pathname.startsWith(path);

  const pillBase = {
    padding: '6px 15px', borderRadius: 9999,
    border: '1.5px solid rgba(120,160,100,0.28)',
    background: 'rgba(255,255,255,0.5)',
    color: '#6A8270', fontSize: 12, fontWeight: 700,
    cursor: 'pointer', fontFamily: "'Gowun Dodum', sans-serif",
  };
  const pillActive = {
    ...pillBase,
    background: 'linear-gradient(135deg,#7BAE8B,#9DCFBA)',
    borderColor: '#7BAE8B', color: '#fff',
  };

  return (
    <>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 40px',
        background: 'rgba(255,255,255,0.58)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: '1px solid rgba(120,160,100,0.2)',
        boxShadow: '0 2px 16px rgba(80,130,90,0.07)',
      }}>
        <div onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <UniLogo size={40} radius={12} />
          <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 19, fontWeight: 800, fontFamily: "'Nanum Gothic', sans-serif" }}>
            <span style={{ color: '#8BB4D4' }}>u</span>
            <span style={{ color: '#D4B86A' }}>n</span>
            <span style={{ color: '#7BAE8B' }}>i</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => navigate('/mail')} style={isActive('/mail') ? pillActive : pillBase}>📮 익명우편소</button>
          <button onClick={() => navigate('/community')} style={isActive('/community') ? pillActive : pillBase}>💬 커뮤니티</button>

          {isLoggedIn ? (
            <button onClick={logout} style={{ ...pillBase, background: 'rgba(123,174,139,0.12)', borderColor: 'rgba(123,174,139,0.4)', color: '#4A7A5A' }}>
              {user.randomNick} · 로그아웃
            </button>
          ) : (
            <button onClick={() => navigate('/login')} style={pillActive}>로그인</button>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}>
            {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 18, height: 2, background: '#7BAE8B', borderRadius: 2 }} />)}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }} onClick={() => setMenuOpen(false)}>
          <div style={{
            position: 'absolute', top: 62, right: 40,
            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(120,160,100,0.25)', borderRadius: 16,
            padding: '8px 0', boxShadow: '0 8px 32px rgba(80,130,90,0.15)', minWidth: 170,
          }} onClick={e => e.stopPropagation()}>
            {[
              { label: '🏠 홈', path: '/' },
              { label: '📮 익명우편소', path: '/mail' },
              { label: '💬 커뮤니티', path: '/community' },
              ...(!isLoggedIn ? [{ label: '🔑 로그인', path: '/login' }, { label: '✍️ 회원가입', path: '/register' }] : []),
            ].map(item => (
              <button key={item.path}
                onClick={() => { navigate(item.path); setMenuOpen(false); }}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '11px 20px', fontSize: 14, color: '#3A5240', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Gowun Dodum', sans-serif" }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
