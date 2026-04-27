import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import UniLogo from '../components/UniLogo';
import { showToast } from '../components/Toast';

export default function WritePostPage({ addPost }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // 비로그인 접근 차단
  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 500, margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
        <p style={{ fontSize: 16, color: '#3A5240', fontWeight: 700, marginBottom: 8 }}>로그인이 필요해요</p>
        <p style={{ fontSize: 14, color: '#6A8270', marginBottom: 24 }}>글쓰기는 로그인 후 이용 가능해요.</p>
        <button onClick={() => navigate('/login')} style={{ padding: '11px 36px', background: 'linear-gradient(135deg,#7BAE8B,#9DCFBA)', color: '#fff', border: 'none', borderRadius: 9999, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'Nanum Gothic', sans-serif" }}>
          로그인하러 가기
        </button>
      </div>
    );
  }

  function handleSubmit() {
    if (!title.trim()) { showToast('제목을 입력해주세요'); return; }
    if (!body.trim()) { showToast('내용을 입력해주세요'); return; }
    const newId = addPost({ title: title.trim(), body: body.trim() });
    showToast('게시글이 등록되었어요! 💚');
    navigate(`/community/${newId}`);
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 20px' }}>
      <button onClick={() => navigate('/community')} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13.5, color: '#7BAE8B', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 18 }}>
        ← 목록으로
      </button>
      <div style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(10px)', border: '1px solid rgba(120,160,100,0.25)', borderRadius: 22, padding: '24px 22px', boxShadow: '0 4px 20px rgba(80,130,90,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <UniLogo size={36} radius={10} />
          <span style={{ fontSize: 15, fontWeight: 800, color: '#3A5240', fontFamily: "'Nanum Gothic', sans-serif" }}>비장애 형제 친구들과 얘기를 나눠 봐요!</span>
        </div>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목을 입력해주세요" maxLength={80}
          style={{ width: '100%', padding: '11px 18px', border: '1.5px solid rgba(120,160,100,0.28)', borderRadius: 9999, fontSize: 14.5, background: 'rgba(255,255,255,0.6)', color: '#3A5240', outline: 'none', marginBottom: 14, fontFamily: "'Gowun Dodum', sans-serif" }} />
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="(욕설 및 비방 글은 삭제됩니다.)"
          style={{ width: '100%', minHeight: 220, border: '1.5px solid rgba(120,160,100,0.28)', borderRadius: 16, padding: '14px 18px', fontSize: 14, lineHeight: 1.8, background: 'rgba(255,255,255,0.6)', color: '#3A5240', resize: 'vertical', outline: 'none', marginBottom: 20, fontFamily: "'Gowun Dodum', sans-serif" }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={handleSubmit} style={{ padding: '12px 52px', background: 'linear-gradient(135deg,#7BAE8B,#9DCFBA)', color: '#fff', border: 'none', borderRadius: 9999, fontSize: 15, fontWeight: 800, fontFamily: "'Nanum Gothic', sans-serif", cursor: 'pointer', boxShadow: '0 4px 14px rgba(123,174,139,0.35)' }}>게시</button>
        </div>
      </div>
    </div>
  );
}
