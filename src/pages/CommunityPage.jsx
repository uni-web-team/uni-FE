import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UniLogo from '../components/UniLogo';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../components/Toast';

const POSTS_PER_PAGE = 8;

export default function CommunityPage({ posts }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = posts.filter(p => p.title.includes(search) || p.body.includes(search));
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const pagePosts = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  function handleWrite() {
    if (!isLoggedIn) { showToast('글쓰기는 로그인 후 이용 가능해요 🔒'); navigate('/login'); return; }
    navigate('/community/write');
  }

  const cardStyle = {
    background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(120,160,100,0.25)',
    borderRadius: 22, overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(80,130,90,0.1)',
    marginBottom: 14,
  };

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <UniLogo size={36} radius={10} />
          <span style={{ fontSize: 16, fontWeight: 800, color: '#3A5240', fontFamily: "'Nanum Gothic', sans-serif" }}>
            비장애 형제 친구들과 얘기를 나눠 봐요!
          </span>
        </div>
        {isLoggedIn ? (
          <button onClick={handleWrite} style={{
            padding: '8px 20px', borderRadius: 9999,
            background: 'linear-gradient(135deg,#7BAE8B,#9DCFBA)',
            color: '#fff', border: 'none', fontSize: 13, fontWeight: 700,
            fontFamily: "'Nanum Gothic', sans-serif", cursor: 'pointer',
            boxShadow: '0 3px 10px rgba(123,174,139,0.3)',
          }}>✏️ 글쓰기</button>
        ) : (
          <button onClick={handleWrite} style={{
            padding: '8px 20px', borderRadius: 9999,
            background: 'rgba(180,180,180,0.2)',
            color: '#aaa', border: '1.5px solid rgba(180,180,180,0.3)',
            fontSize: 13, fontWeight: 700, fontFamily: "'Nanum Gothic', sans-serif",
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          }}>🔒 글쓰기</button>
        )}
      </div>

      {/* 비로그인 안내 배너 */}
      {!isLoggedIn && (
        <div style={{
          background: 'rgba(255,255,255,0.75)',
          border: '1.5px solid rgba(120,160,100,0.25)',
          borderRadius: 14, padding: '16px 22px',
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16,
        }}>
          <span style={{ fontSize: 20 }}>🔒</span>
          <div style={{ fontSize: 13.5, color: '#6A8270', lineHeight: 1.7 }}>
            <strong style={{ color: '#3A5240' }}>글쓰기와 댓글은 로그인 후 이용 가능해요.</strong><br />
            <span onClick={() => navigate('/login')} style={{ color: '#7BAE8B', fontWeight: 700, cursor: 'pointer' }}>로그인</span>하거나{' '}
            <span onClick={() => navigate('/register')} style={{ color: '#7BAE8B', fontWeight: 700, cursor: 'pointer' }}>회원가입</span>하고 커뮤니티에 참여해 보세요!
          </div>
        </div>
      )}

      {/* 검색 */}
      <input
        value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
        placeholder="🔍  검색어를 입력하세요"
        style={{
          width: '100%', padding: '11px 18px',
          border: '1.5px solid rgba(120,160,100,0.25)',
          borderRadius: 9999, fontSize: 14,
          background: 'rgba(255,255,255,0.6)',
          color: '#3A5240', outline: 'none', marginBottom: 16,
          fontFamily: "'Gowun Dodum', sans-serif",
        }}
      />

      {/* 테이블 */}
      <div style={cardStyle}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5, tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ background: 'rgba(123,174,139,0.1)' }}>
              <th style={{ padding: '12px 20px', textAlign: 'left', color: '#4A7A5A', fontWeight: 800, fontFamily: "'Nanum Gothic', sans-serif", fontSize: 12, borderBottom: '1px solid rgba(120,160,100,0.18)', width: '50%' }}>글 제목</th>
              <th style={{ padding: '12px 14px', textAlign: 'left', color: '#4A7A5A', fontWeight: 800, fontFamily: "'Nanum Gothic', sans-serif", fontSize: 12, borderBottom: '1px solid rgba(120,160,100,0.18)', width: '25%' }}>작성자 (랜덤 닉네임)</th>
              <th style={{ padding: '12px 14px', textAlign: 'left', color: '#4A7A5A', fontWeight: 800, fontFamily: "'Nanum Gothic', sans-serif", fontSize: 12, borderBottom: '1px solid rgba(120,160,100,0.18)', width: '14%' }}>날짜</th>
              <th style={{ padding: '12px 12px', textAlign: 'center', color: '#4A7A5A', fontWeight: 800, fontFamily: "'Nanum Gothic', sans-serif", fontSize: 12, borderBottom: '1px solid rgba(120,160,100,0.18)', width: '11%' }}>💬</th>
            </tr>
          </thead>
          <tbody>
            {pagePosts.length === 0 && (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#92A898' }}>게시글이 없어요 🌿</td></tr>
            )}
            {pagePosts.map((post, i) => (
              <tr key={post.id}
                onClick={() => navigate(`/community/${post.id}`)}
                style={{ cursor: 'pointer', borderBottom: i < pagePosts.length - 1 ? '1px solid rgba(120,160,100,0.1)' : 'none' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = ''; }}>
                <td style={{ padding: '13px 20px', color: '#3A5240', fontWeight: 500 }}>{post.title}</td>
                <td style={{ padding: '13px 14px', color: '#6A8270', fontSize: 13 }}>{post.author}</td>
                <td style={{ padding: '13px 14px', color: '#92A898', fontSize: 12 }}>{post.date.split(' ')[0]}</td>
                <td style={{ padding: '13px 12px', textAlign: 'center', color: '#92A898', fontSize: 13 }}>{post.comments.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 18 }}>
          <PagBtn label="‹" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <PagBtn key={n} label={n} active={n === page} onClick={() => setPage(n)} />
          ))}
          <PagBtn label="›" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
        </div>
      )}
      <p style={{ textAlign: 'center', fontSize: 12, color: '#92A898', marginTop: 10 }}>
        총 {filtered.length}개의 게시글 · 페이지당 {POSTS_PER_PAGE}개
      </p>
    </div>
  );
}

function PagBtn({ label, active, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: 34, height: 34, borderRadius: 9999,
      border: `1.5px solid ${active ? '#7BAE8B' : 'rgba(120,160,100,0.28)'}`,
      background: active ? 'linear-gradient(135deg,#7BAE8B,#9DCFBA)' : disabled ? 'rgba(200,200,200,0.2)' : 'rgba(255,255,255,0.6)',
      color: active ? '#fff' : disabled ? '#ccc' : '#6A8270',
      fontSize: 13.5, fontWeight: 700, fontFamily: "'Nanum Gothic', sans-serif",
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{label}</button>
  );
}
