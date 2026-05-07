import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UniLogo from '../components/UniLogo';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../components/Toast';

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const inputStyle = (hasError) => ({
  width: '100%', padding: '12px 18px',
  border: `1.5px solid ${hasError ? '#E05555' : 'rgba(120,160,100,0.3)'}`,
  borderRadius: 12, fontSize: 14,
  background: hasError ? 'rgba(255,240,240,0.6)' : 'rgba(255,255,255,0.65)',
  color: '#3A5240', outline: 'none',
  fontFamily: "'Gowun Dodum', sans-serif",
});

const KakaoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2C5.582 2 2 4.896 2 8.444c0 2.27 1.492 4.26 3.75 5.38L4.89 17.5l4.07-2.694c.345.047.697.072 1.04.072 4.418 0 8-2.896 8-6.434C18 4.896 14.418 2 10 2z" fill="#3C1E1E"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M19.6 10.23c0-.68-.06-1.36-.17-2H10v3.79h5.4a4.6 4.6 0 01-2 3.02v2.5h3.24c1.9-1.75 3-4.33 3-7.31z" fill="#4285F4"/>
    <path d="M10 20c2.7 0 4.97-.9 6.63-2.43l-3.24-2.51c-.9.6-2.05.96-3.39.96-2.6 0-4.8-1.76-5.6-4.12H1.06v2.6A10 10 0 0010 20z" fill="#34A853"/>
    <path d="M4.4 11.9A5.96 5.96 0 014.1 10c0-.66.11-1.3.3-1.9V5.5H1.06A10 10 0 000 10c0 1.61.38 3.13 1.06 4.5l3.34-2.6z" fill="#FBBC05"/>
    <path d="M10 3.98c1.47 0 2.78.5 3.82 1.5l2.86-2.86C14.96.9 12.7 0 10 0A10 10 0 001.06 5.5l3.34 2.6C5.2 5.74 7.4 3.98 10 3.98z" fill="#EA4335"/>
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const emailError = emailTouched && email.length > 0 && !isValidEmail(email);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) { showToast('이메일과 비밀번호를 입력해주세요'); return; }
    if (!isValidEmail(email)) { setEmailTouched(true); return; }
    try {
      await login(email, password);
      showToast('로그인 되었어요! 💚');
      navigate('/');
    } catch (e) {
      showToast(e.message || '로그인에 실패했어요');
    }
  }

  function handleSocial(provider) {
    if (provider === '카카오') {
      window.location.href = `${API}/kakao`;
    } else if (provider === 'Google') {
      window.location.href = `${API}/google`;
    }
  }

  const card = {
    background: 'rgba(255,255,255,0.68)', backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(120,160,100,0.22)',
    borderRadius: 26, padding: '38px 34px',
    boxShadow: '0 4px 24px rgba(80,130,90,0.1)',
  };

  return (
    <div style={{ maxWidth: 440, margin: '0 auto', padding: '40px 20px' }}>
      <div style={card}>
        {/* 로고 */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <UniLogo size={68} radius={20} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#3A5240', fontFamily: "'Nanum Gothic', sans-serif" }}>로그인</div>
          <div style={{ fontSize: 13, color: '#6A8270', marginTop: 5 }}>uni에 오신 걸 환영해요 💚</div>
        </div>

        {/* 이메일 */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#6A8270', marginBottom: 6 }}>이메일</div>
          <input
            style={inputStyle(emailError)}
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={e => { setEmail(e.target.value); setEmailTouched(true); }}
            onBlur={() => setEmailTouched(true)}
          />
          {emailError && (
            <div style={{ fontSize: 12.5, color: '#E05555', marginTop: 5, paddingLeft: 4 }}>
              올바른 이메일 형식이 아니에요. (예: example@email.com)
            </div>
          )}
        </div>

        {/* 비밀번호 */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#6A8270', marginBottom: 6 }}>비밀번호</div>
          <input
            style={inputStyle(false)}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18, marginTop: 8 }}>
          <span style={{ fontSize: 12.5, color: '#7BAE8B', fontWeight: 700, cursor: 'pointer' }}>
            비밀번호를 잊으셨나요?
          </span>
        </div>

        <button onClick={handleLogin} style={{
          width: '100%', padding: 13,
          background: 'linear-gradient(135deg,#7BAE8B,#9DCFBA)',
          color: '#fff', border: 'none', borderRadius: 12,
          fontSize: 15, fontWeight: 800, fontFamily: "'Nanum Gothic', sans-serif",
          cursor: 'pointer',
        }}>로그인</button>

        {/* OR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', fontSize: 12, color: '#92A898' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(120,160,100,0.2)' }} />
          또는
          <div style={{ flex: 1, height: 1, background: 'rgba(120,160,100,0.2)' }} />
        </div>

        {/* 카카오 */}
        <button onClick={() => handleSocial('카카오')} style={{
          width: '100%', padding: '12px 18px', borderRadius: 12,
          background: '#FEE500', border: 'none',
          display: 'flex', alignItems: 'center', gap: 12,
          fontSize: 14, fontWeight: 700, color: '#191919',
          fontFamily: "'Gowun Dodum', sans-serif", cursor: 'pointer', marginBottom: 10,
        }}>
          <KakaoIcon />카카오로 계속하기
        </button>

        {/* 구글 */}
        <button onClick={() => handleSocial('Google')} style={{
          width: '100%', padding: '12px 18px', borderRadius: 12,
          background: '#fff', border: '1.5px solid rgba(0,0,0,0.12)',
          display: 'flex', alignItems: 'center', gap: 12,
          fontSize: 14, fontWeight: 700, color: '#3C4043',
          fontFamily: "'Gowun Dodum', sans-serif", cursor: 'pointer',
        }}>
          <GoogleIcon />Google로 계속하기
        </button>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#6A8270' }}>
          아직 계정이 없으신가요?{' '}
          <span onClick={() => navigate('/register')}
            style={{ color: '#7BAE8B', fontWeight: 700, cursor: 'pointer' }}>회원가입</span>
        </div>
      </div>
    </div>
  );
}
