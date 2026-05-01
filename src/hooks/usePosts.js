import { useState, useEffect, useCallback } from 'react';
import { ANIMAL_NICKS, fmtDate } from '../data/store';

const API = '/api/posts';

function authHeaders() {
  const token = localStorage.getItem('uni_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export function usePosts() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(() => {
    fetch(`${API}?per_page=100`)
      .then((r) => r.json())
      .then((data) => setPosts(data.posts ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 동기 반환(tempId) + 백그라운드 API 동기화
  function addPost({ title, body }) {
    const tempId = Date.now();
    const tempPost = {
      id: tempId,
      title,
      body,
      author: ANIMAL_NICKS[Math.floor(Math.random() * ANIMAL_NICKS.length)],
      date: fmtDate(),
      likes: 0,
      liked: false,
      comments: [],
    };
    setPosts((prev) => [tempPost, ...prev]);

    fetch(API, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ title, body }),
    })
      .then((r) => r.json())
      .then((newPost) =>
        setPosts((prev) => prev.map((p) => (p.id === tempId ? newPost : p)))
      )
      .catch(() => setPosts((prev) => prev.filter((p) => p.id !== tempId)));

    return tempId;
  }

  function addComment(postId, text) {
    const tempId = Date.now();
    const tempComment = { id: tempId, text, nick: '익명?', date: fmtDate(), likes: 0, liked: false };
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, tempComment] } : p))
    );

    fetch(`${API}/${postId}/comments`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ text }),
    })
      .then((r) => r.json())
      .then((newComment) =>
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? { ...p, comments: p.comments.map((c) => (c.id === tempId ? newComment : c)) }
              : p
          )
        )
      )
      .catch(() =>
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, comments: p.comments.filter((c) => c.id !== tempId) } : p
          )
        )
      );
  }

  function toggleLikePost(postId) {
    // 낙관적 업데이트
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p
      )
    );

    fetch(`${API}/${postId}/like`, { method: 'POST', headers: authHeaders() })
      .then((r) => r.json())
      .then(({ liked, likes }) =>
        setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likes, liked } : p)))
      )
      .catch(() =>
        // 실패 시 롤백
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, likes: p.liked ? p.likes + 1 : p.likes - 1, liked: !p.liked } : p
          )
        )
      );
  }

  function toggleLikeComment(postId, commentId) {
    // 낙관적 업데이트
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments.map((c) =>
                c.id === commentId ? { ...c, likes: c.liked ? c.likes - 1 : c.likes + 1, liked: !c.liked } : c
              ),
            }
          : p
      )
    );

    fetch(`${API}/${postId}/comments/${commentId}/like`, { method: 'POST', headers: authHeaders() })
      .then((r) => r.json())
      .then(({ liked, likes }) =>
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? { ...p, comments: p.comments.map((c) => (c.id === commentId ? { ...c, likes, liked } : c)) }
              : p
          )
        )
      )
      .catch(() =>
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  comments: p.comments.map((c) =>
                    c.id === commentId ? { ...c, likes: c.liked ? c.likes + 1 : c.likes - 1, liked: !c.liked } : c
                  ),
                }
              : p
          )
        )
      );
  }

  function getPost(id) {
    return posts.find((p) => p.id === Number(id));
  }

  return { posts, addPost, addComment, toggleLikePost, toggleLikeComment, getPost, fetchPosts };
}
