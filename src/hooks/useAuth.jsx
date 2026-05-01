import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const API = '/api/auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('uni_token');
    const email = localStorage.getItem('uni_email');
    return token && email ? { email } : null;
  });

  async function login(email, password) {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.detail || '로그인에 실패했어요');
    }
    const data = await res.json();
    localStorage.setItem('uni_token', data.access_token);
    localStorage.setItem('uni_email', data.email);
    setUser({ email: data.email });
  }

  async function register(email, password) {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.detail || '회원가입에 실패했어요');
    }
    const data = await res.json();
    localStorage.setItem('uni_token', data.access_token);
    localStorage.setItem('uni_email', data.email);
    setUser({ email: data.email });
  }

  function logout() {
    localStorage.removeItem('uni_token');
    localStorage.removeItem('uni_email');
    setUser(null);
  }

  function getToken() {
    return localStorage.getItem('uni_token');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoggedIn: !!user, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
