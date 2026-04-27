# UNI 웹앱

비장애 형제 커뮤니티 웹 서비스

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 폴더 구조

```
src/
├── components/
│   ├── TopNav.jsx       # 상단 네비게이션 (햄버거 메뉴 포함)
│   └── Toast.jsx        # 토스트 알림
├── data/
│   └── store.js         # 샘플 데이터 & 유틸 함수
├── hooks/
│   └── usePosts.js      # 게시글 상태 관리 커스텀 훅
├── pages/
│   ├── HomePage.jsx     # 홈 화면
│   ├── MailPage.jsx     # 익명우편소
│   ├── CommunityPage.jsx   # 커뮤니티 목록
│   ├── PostDetailPage.jsx  # 게시글 상세 + 댓글
│   └── WritePostPage.jsx   # 글쓰기
├── styles/
│   └── global.css       # 전역 CSS (CSS 변수, 리셋)
├── App.jsx              # 라우팅
└── main.jsx             # 엔트리포인트
```

## 구현된 기능

- 📮 **익명우편소** — 고민 제출 폼
- 💬 **커뮤니티** — 게시글 목록 (검색 포함)
- 📝 **글쓰기** — 익명 닉네임 자동 부여
- 🗨️ **댓글** — 익명 댓글 + 좋아요
- 💚 **좋아요** — 게시글/댓글 좋아요 토글
- 🔔 **토스트 알림** — 액션 피드백
- 🔀 **React Router** — 페이지 전환

## 향후 추가 예정

- 백엔드 연동 (현재는 메모리 상태만)
- 관리자 페이지 (익명우편소 답장 발송)
- 로그인/인증 (관리자 전용)
