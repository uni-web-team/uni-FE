import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../components/Toast';

export default function PostDetailPage({ getPost, addComment, toggleLikePost, toggleLikeComment }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const post = getPost(id);
  const [commentText, setCommentText] = useState('');

  if (!post) return (
    <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6A8270' }}>
      게시글을 찾을 수 없어요.<br />
      <button onClick={() => navigate('/community')}
        style={{ marginTop: 16, color: '#7BAE8B', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
        ← 목록으로
      </button>
    </div>
  );

  function handleComment() {
    if (!commentText.trim()) { showToast('댓글을 입력해주세요'); return; }
    addComment(post.id, commentText.trim());
    setCommentText('');
    showToast('댓글이 등록되었어요 💚');
  }

  function handleLikePost() {
    if (!isLoggedIn) { showToast('좋아요는 로그인 후 누를 수 있어요 🔒'); return; }
    toggleLikePost(post.id);
    showToast(post.liked ? '좋아요를 취소했어요' : '좋아요를 눌렀어요 💚');
  }

  function handleLikeComment(commentId, liked) {
    if (!isLoggedIn) { showToast('좋아요는 로그인 후 누를 수 있어요 🔒'); return; }
    toggleLikeComment(post.id, commentId);
  }

  const card = {
    background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(120,160,100,0.25)',
    borderRadius: 22, padding: '24px 22px',
    boxShadow: '0 4px 20px rgba(80,130,90,0.1)', marginBottom: 16,
  };

  const likePostActive = isLoggedIn && post.liked;

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 20px' }}>
      <button onClick={() => navigate('/community')}
        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13.5, color: '#7BAE8B', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 18 }}>
        ← 목록으로
      </button>

      <div style={card}>
        {/* 제목 */}
        <div style={{ background: 'rgba(255,255,255,0.82)', border: '1.5px solid rgba(120,160,100,0.22)', borderRadius: 14, padding: '13px 18px', fontSize: 16, fontWeight: 700, color: '#3A5240', marginBottom: 12 }}>
          {post.title}
        </div>

        {/* 메타 */}
        <div style={{ fontSize: 12.5, color: '#92A898', marginBottom: 16 }}>
          작성자: <span style={{ color: '#7BAE8B', fontWeight: 700 }}>{post.author}</span>　|　{post.date}
        </div>

        {/* 본문 */}
        <p style={{ fontSize: 14.5, lineHeight: 1.9, color: '#3A5240', minHeight: 80 }}>{post.body}</p>

        {/* 좋아요 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
          <button
            onClick={handleLikePost}
            title={!isLoggedIn ? '로그인 후 이용 가능해요' : ''}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 18px', borderRadius: 9999,
              border: `1.5px solid ${likePostActive ? '#7BAE8B' : 'rgba(120,160,100,0.3)'}`,
              background: likePostActive ? 'rgba(123,174,139,0.12)' : 'rgba(255,255,255,0.5)',
              color: likePostActive ? '#7BAE8B' : '#6A8270',
              fontSize: 13, fontWeight: 700,
              cursor: isLoggedIn ? 'pointer' : 'default',
              opacity: isLoggedIn ? 1 : 0.6,
            }}>
            {likePostActive ? '💚' : '🤍'} {post.likes}
          </button>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(120,160,100,0.2)', margin: '16px 0' }} />

        {/* 댓글 헤더 */}
        <h2 style={{ fontSize: 15, fontWeight: 800, color: '#3A5240', fontFamily: "'Nanum Gothic', sans-serif", marginBottom: 14 }}>
          💬 댓글 {post.comments.length > 0 && <span style={{ color: '#7BAE8B' }}>{post.comments.length}</span>}
        </h2>

        {post.comments.length === 0 && (
          <p style={{ color: '#92A898', fontSize: 13.5, textAlign: 'center', padding: '16px 0' }}>
            아직 댓글이 없어요. 첫 댓글을 남겨보세요! 💚
          </p>
        )}

        {/* 댓글 목록 — 비로그인도 볼 수 있음 */}
        {post.comments.map((c, i) => {
          const likeActive = isLoggedIn && c.liked;
          return (
            <div key={c.id} style={{ padding: '13px 0', borderBottom: i < post.comments.length - 1 ? '1px solid rgba(120,160,100,0.1)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#7BAE8B' }}>{c.nick}</span>
                  <span style={{ fontSize: 11, color: '#92A898', marginLeft: 8 }}>{c.date}</span>
                  <p style={{ fontSize: 13.5, color: '#3A5240', marginTop: 5, lineHeight: 1.7 }}>{c.text}</p>
                </div>
                {/* 댓글 좋아요: 비로그인 시 흐리게 + 클릭 시 토스트 */}
                <button
                  onClick={() => handleLikeComment(c.id, c.liked)}
                  title={!isLoggedIn ? '로그인 후 이용 가능해요' : ''}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '4px 10px', borderRadius: 9999,
                    border: `1px solid ${likeActive ? '#7BAE8B' : 'rgba(120,160,100,0.25)'}`,
                    background: likeActive ? 'rgba(123,174,139,0.1)' : 'rgba(255,255,255,0.5)',
                    color: likeActive ? '#7BAE8B' : '#92A898',
                    fontSize: 11.5, marginLeft: 12,
                    cursor: isLoggedIn ? 'pointer' : 'default',
                    opacity: isLoggedIn ? 1 : 0.5,
                  }}>
                  {likeActive ? '💚' : '🤍'} {c.likes}
                </button>
              </div>
            </div>
          );
        })}

        {/* 댓글 입력 — 로그인 여부에 따라 분기 */}
        {isLoggedIn ? (
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <input
              value={commentText} onChange={e => setCommentText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleComment()}
              placeholder="따뜻한 댓글을 남겨주세요..."
              style={{ flex: 1, border: '1.5px solid rgba(120,160,100,0.28)', borderRadius: 9999, padding: '9px 18px', fontSize: 13.5, background: 'rgba(255,255,255,0.6)', color: '#3A5240', outline: 'none', fontFamily: "'Gowun Dodum', sans-serif" }} />
            <button onClick={handleComment}
              style={{ padding: '9px 20px', borderRadius: 9999, background: 'linear-gradient(135deg,#7BAE8B,#9DCFBA)', color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, fontFamily: "'Nanum Gothic', sans-serif", cursor: 'pointer', whiteSpace: 'nowrap' }}>
              등록
            </button>
          </div>
        ) : (
          <div style={{ background: 'rgba(245,245,240,0.7)', border: '1.5px dashed rgba(120,160,100,0.3)', borderRadius: 12, padding: '18px', textAlign: 'center', marginTop: 16, fontSize: 13.5, color: '#92A898' }}>
            🔒 댓글은 로그인 후 작성할 수 있어요.<br />
            <span onClick={() => navigate('/login')} style={{ color: '#7BAE8B', fontWeight: 700, cursor: 'pointer' }}>로그인</span>하거나{' '}
            <span onClick={() => navigate('/register')} style={{ color: '#7BAE8B', fontWeight: 700, cursor: 'pointer' }}>회원가입</span>하고 대화에 참여해보세요!
          </div>
        )}
      </div>
    </div>
  );
}
