// 랜덤 동물 닉네임
export const ANIMAL_NICKS = [
  '하늘다람쥐', '초록거북이', '분홍고양이', '노란강아지',
  '보라고슴도치', '파란펭귄', '빨간여우', '흰토끼',
  '금빛나비', '은빛물고기', '솜사탕곰', '달빛올빼미',
  '꽃잎개구리', '무지개햄스터', '새벽별고양이',
];

export function randNick() {
  return ANIMAL_NICKS[Math.floor(Math.random() * ANIMAL_NICKS.length)];
}

export function fmtDate(d = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// 초기 샘플 게시글
export const INITIAL_POSTS = [
  {
    id: 1,
    title: '장애 형제랑 외식할 때 어떻게 하세요?',
    author: '하늘다람쥐',
    date: '2026.04.25 13:20',
    body: '저희 형이 자폐가 있는데 식당 가면 소리를 많이 내서 눈치가 보여요. 다들 어떻게 하시나요? 좋은 방법 알려주세요 🥺',
    likes: 12,
    comments: [
      { id: 1, text: '저는 조용한 패밀리 레스토랑 자주 가요! 웨이팅 없는 곳 추천드려요', nick: '초록거북이', date: '2026.04.25 14:00', likes: 3 },
      { id: 2, text: '배달 시켜서 집에서 먹는 게 제일 편하더라고요 😂', nick: '솜사탕곰', date: '2026.04.25 15:30', likes: 5 },
    ],
  },
  {
    id: 2,
    title: '비형제 모임 같은 거 있나요?',
    author: '분홍고양이',
    date: '2026.04.26 09:15',
    body: '비장애 형제들끼리 모여서 이야기 나누는 자리가 있으면 좋겠다 싶어서요. 혼자만의 고민인 줄 알았는데 다들 비슷한 경험이 있을 것 같아서요.',
    likes: 8,
    comments: [],
  },
  {
    id: 3,
    title: '부모님이 형한테만 집중할 때',
    author: '노란강아지',
    date: '2026.04.26 21:40',
    body: '부모님이 장애가 있는 형 케어하느라 저한테는 신경을 못 써주실 때가 많아요. 서운하기도 하고 또 미안하기도 하고... 복잡해요.',
    likes: 24,
    comments: [
      { id: 1, text: '많이 공감돼요. 그 감정 당연한 거예요 💚', nick: '보라고슴도치', date: '2026.04.27 08:30', likes: 7 },
    ],
  },
  {
    id: 4,
    title: '친구들한테 어떻게 설명하시나요?',
    author: '달빛올빼미',
    date: '2026.04.27 11:05',
    body: '친구들이 우리 동생 보면 이상하게 쳐다보거나 불편해할 때 어떻게 대처하시나요? 설명을 해줘야 하나 그냥 넘어가야 하나 항상 어렵더라고요.',
    likes: 15,
    comments: [],
  },
];
