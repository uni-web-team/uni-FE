import { useState } from 'react';
import { showToast } from '../components/Toast';
import UniLogo from '../components/UniLogo';

export default function MailPage() {
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!content.trim()) { showToast('고민을 입력해주세요 💚'); return; }
    setSubmitted(true);
    setContent('');
    showToast('고민이 접수되었어요! 곧 따뜻한 답장이 올 거예요 📮');
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <UniLogo size={40} radius={12} />
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#3A5240', fontFamily: "'Nanum Gothic', sans-serif" }}>
          UNI 익명우편소
        </h1>
      </div>

      {/* Form Card */}
      <div style={{
        background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(120,160,100,0.25)',
        borderRadius: 22, padding: '24px 22px',
        boxShadow: '0 4px 20px rgba(80,130,90,0.1)',
        marginBottom: 16,
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.8)',
          border: '1.5px solid rgba(120,160,100,0.25)',
          borderRadius: 9999, padding: '10px 20px',
          fontSize: 14, fontWeight: 700, color: '#3A5240',
          textAlign: 'center', marginBottom: 16,
        }}>당신의 고민을 입력해주세요</div>

        <p style={{ fontSize: 12.5, color: '#6A8270', lineHeight: 1.8, marginBottom: 14, textAlign: 'center' }}>
          장애 형제의 장애 종류와 본인의 성별, 나이, 사는 지역,<br />
          답장을 받으실 이메일을 알려주세요.<br />
          이벤트 참여를 원하시면 전화번호도 적어주세요.<br />
          <span style={{ color: '#92A898' }}>기입하신 정보는 고민 답장과 이벤트 종료 동시에 삭제됩니다.</span>
        </p>

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="여기에 고민을 적어주세요..."
          style={{
            width: '100%', minHeight: 180,
            border: '1.5px solid rgba(120,160,100,0.3)',
            borderRadius: 14, padding: '14px 16px',
            fontSize: 14, lineHeight: 1.8,
            background: 'rgba(255,255,255,0.6)',
            color: '#3A5240', resize: 'vertical', outline: 'none',
            fontFamily: "'Gowun Dodum', sans-serif",
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onFocus={e => { e.target.style.borderColor = '#A8C8B0'; e.target.style.background = 'rgba(255,255,255,0.9)'; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(120,160,100,0.3)'; e.target.style.background = 'rgba(255,255,255,0.6)'; }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: '12px 48px',
            background: 'linear-gradient(135deg,#7BAE8B,#9DCFBA)',
            color: '#fff', border: 'none', borderRadius: 9999,
            fontSize: 15, fontWeight: 700,
            fontFamily: "'Nanum Gothic', sans-serif",
            boxShadow: '0 4px 14px rgba(123,174,139,0.35)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px rgba(123,174,139,0.45)'; }}
          onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 4px 14px rgba(123,174,139,0.35)'; }}
        >
          {submitted ? '✓ 제출 완료!' : '제출'}
        </button>
      </div>

      {/* Info */}
      <div style={{
        marginTop: 24, background: 'rgba(255,255,255,0.4)',
        border: '1px solid rgba(120,160,100,0.18)',
        borderRadius: 14, padding: '14px 18px',
        fontSize: 12.5, color: '#6A8270', lineHeight: 1.8,
      }}>
        🔒 제출된 고민은 관리자만 확인하며, 개인정보는 안전하게 보호됩니다.
      </div>
    </div>
  );
}
