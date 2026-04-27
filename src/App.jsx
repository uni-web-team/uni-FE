import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import TopNav from './components/TopNav';
import Toast from './components/Toast';
import { usePosts } from './hooks/usePosts';

import HomePage from './pages/HomePage';
import MailPage from './pages/MailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CommunityPage from './pages/CommunityPage';
import PostDetailPage from './pages/PostDetailPage';
import WritePostPage from './pages/WritePostPage';

function AppInner() {
  const { posts, addPost, addComment, toggleLikePost, toggleLikeComment, getPost } = usePosts();
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mail" element={<MailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/community" element={<CommunityPage posts={posts} />} />
        <Route path="/community/write" element={<WritePostPage addPost={addPost} />} />
        <Route path="/community/:id" element={
          <PostDetailPage getPost={getPost} addComment={addComment} toggleLikePost={toggleLikePost} toggleLikeComment={toggleLikeComment} />
        } />
      </Routes>
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </BrowserRouter>
  );
}
