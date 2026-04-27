import { useState } from 'react';
import { INITIAL_POSTS, randNick, fmtDate } from '../data/store';

export function usePosts() {
  const [posts, setPosts] = useState(INITIAL_POSTS);

  function addPost({ title, body }) {
    const newPost = {
      id: Date.now(),
      title,
      author: randNick(),
      date: fmtDate(),
      body,
      likes: 0,
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost.id;
  }

  function addComment(postId, text) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: Date.now(), text, nick: randNick(), date: fmtDate(), likes: 0 },
              ],
            }
          : p
      )
    );
  }

  function toggleLikePost(postId) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p
      )
    );
  }

  function toggleLikeComment(postId, commentId) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments.map((c) =>
                c.id === commentId
                  ? { ...c, likes: c.liked ? c.likes - 1 : c.likes + 1, liked: !c.liked }
                  : c
              ),
            }
          : p
      )
    );
  }

  function getPost(id) {
    return posts.find((p) => p.id === Number(id));
  }

  return { posts, addPost, addComment, toggleLikePost, toggleLikeComment, getPost };
}
