import { useEffect, useState } from 'react';

let _setMsg = null;

export function showToast(msg) {
  if (_setMsg) _setMsg(msg);
}

export default function Toast() {
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    _setMsg = (m) => {
      setMsg(m);
      setVisible(true);
      setTimeout(() => setVisible(false), 2600);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(91,138,106,0.92)', color: '#fff',
      padding: '10px 24px', borderRadius: 9999,
      fontSize: 13.5, fontFamily: "'Gowun Dodum', sans-serif",
      boxShadow: '0 4px 20px rgba(80,130,90,0.3)',
      transition: 'opacity 0.3s, transform 0.3s',
      opacity: visible ? 1 : 0,
      pointerEvents: 'none',
      zIndex: 300,
      whiteSpace: 'nowrap',
      transform: `translateX(-50%) translateY(${visible ? 0 : 10}px)`,
    }}>{msg}</div>
  );
}
