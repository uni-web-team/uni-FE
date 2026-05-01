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
  marginBottom: hasError ? 4 : 14,
});

const errMsg = (msg) => (
  <div style={{ fontSize: 12.5, color: '#E05555', marginBottom: 10, paddingLeft: 4 }}>
    {msg}
  </div>
);

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', password2: '' });
  const [touched, setTouched] = useState({ email: false, password: false, password2: false });

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }
  function touch(k) { setTouched(t => ({ ...t, [k]: true })); }

  const emailError = touched.email && form.email.length > 0 && !isValidEmail(form.email);
  const pwError = touched.password && form.password.length > 0 && form.password.length < 8;
  const pw2Error = touched.password2 && form.password2.length > 0 && form.password !== form.password2;

  async function handleRegister() {
    setTouched({ email: true, password: true, password2: true });
    if (!form.email || !form.password) { showToast('이메일과 비밀번호를 입력해주세요'); return; }
    if (!isValidEmail(form.email)) return;
    if (form.password.length < 8) return;
    if (form.password !== form.password2) return;
    try {
      await register(form.email, form.password);
      showToast('환영해요! uni 가족이 되었어요 💚');
      navigate('/');
    } catch (e) {
      showToast(e.message || '회원가입에 실패했어요');
    }
  }

  return (
    <div style={{ maxWidth: 440, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{
        background: 'rgba(255,255,255,0.68)', backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(120,160,100,0.22)',
        borderRadius: 26, padding: '38px 34px',
        boxShadow: '0 4px 24px rgba(80,130,90,0.1)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <UniLogo size={68} radius={20} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#3A5240', fontFamily: "'Nanum Gothic', sans-serif" }}>회원가입</div>
          <div style={{ fontSize: 13, color: '#6A8270', marginTop: 5 }}>함께해요, uni 가족이 되어주세요 💚</div>
        </div>

        {/* 이메일 */}
        <div style={{ fontSize: 13, fontWeight: 700, color: '#6A8270', marginBottom: 6 }}>이메일</div>
        <input
          style={inputStyle(emailError)}
          type="email" placeholder="이메일을 입력해주세요"
          value={form.email}
          onChange={e => { set('email', e.target.value); touch('email'); }}
          onBlur={() => touch('email')}
        />
        {emailError && errMsg('올바른 이메일 형식이 아니에요. (예: example@email.com)')}

        {/* 비밀번호 */}
        <div style={{ fontSize: 13, fontWeight: 700, color: '#6A8270', marginBottom: 6 }}>비밀번호</div>
        <input
          style={inputStyle(pwError)}
          type="password" placeholder="8자 이상 입력해주세요"
          value={form.password}
          onChange={e => { set('password', e.target.value); touch('password'); }}
          onBlur={() => touch('password')}
        />
        {pwError && errMsg('비밀번호는 8자 이상이어야 해요.')}

        {/* 비밀번호 확인 */}
        <div style={{ fontSize: 13, fontWeight: 700, color: '#6A8270', marginBottom: 6 }}>비밀번호 확인</div>
        <input
          style={inputStyle(pw2Error)}
          type="password" placeholder="비밀번호를 한 번 더 입력해주세요"
          value={form.password2}
          onChange={e => { set('password2', e.target.value); touch('password2'); }}
          onBlur={() => touch('password2')}
          onKeyDown={e => e.key === 'Enter' && handleRegister()}
        />
        {pw2Error && errMsg('비밀번호가 일치하지 않아요.')}

        {/* 안내 */}
        <div style={{ background: 'rgba(123,174,139,0.08)', border: '1px solid rgba(120,160,100,0.2)', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#6A8270', lineHeight: 1.7, marginBottom: 18 }}>
          💚 게시글과 댓글은 <strong style={{ color: '#3A5240' }}>랜덤 동물 닉네임</strong>으로 익명 작성돼요.
        </div>

        <button onClick={handleRegister} style={{
          width: '100%', padding: 13,
          background: 'linear-gradient(135deg,#7BAE8B,#9DCFBA)',
          color: '#fff', border: 'none', borderRadius: 12,
          fontSize: 15, fontWeight: 800, fontFamily: "'Nanum Gothic', sans-serif",
          cursor: 'pointer',
        }}>가입하기</button>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#6A8270' }}>
          이미 계정이 있으신가요?{' '}
          <span onClick={() => navigate('/login')}
            style={{ color: '#7BAE8B', fontWeight: 700, cursor: 'pointer' }}>로그인</span>
        </div>
      </div>
    </div>
  );
}
