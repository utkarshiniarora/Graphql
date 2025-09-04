export type Post = {
  id: string;
  author: string;
  content: string;
  likes: number;
  dislikes: number;
  comments: number;
  reposts: number;
  views: number;
  timestamp: string;
  imageUrl?: string | null;
  isReply: boolean;
  parentPostId?: string | null;
};

let now = Date.now();
export const POSTS: Post[] = Array.from({ length: 25 }).map((_, i) => ({
  id: String(i + 1),
  author: i % 2 ? "michelleobama" : "elonmusk",
  content:
    i % 2
      ? "It was such a joy speaking with Ms. Tina Knowles..."
      : "By enabling high-speed Internet globally, Starlink will...",
  likes: 1000 + i * 17,
  dislikes: i % 3 === 0 ? 2 : 0,
  comments: 50 + i * 2,
  reposts: 20 + i,
  views: 100000 + i * 1000,
  timestamp: new Date(now - i * 3600_000).toISOString(),
  imageUrl: i % 4 === 0 ? "https://picsum.photos/seed/" + (i + 1) + "/600/300" : null,
  isReply: i % 5 === 0,
  parentPostId: i % 5 === 0 ? String(Math.max(1, i)) : null
}));

export function getPage(page: number, limit: number) {
  const start = (page - 1) * limit;
  return POSTS.slice(start, start + limit);
}

export function like(id: string) {
  const p = POSTS.find(p => p.id === id)!;
  p.likes += 1;
  return p;
}

let nextId = POSTS.length + 1;
export function makeNewPost(): Post {
  const p: Post = {
    id: String(nextId++),
    author: Math.random() > 0.5 ? "elonmusk" : "michelleobama",
    content:
      Math.random() > 0.5
        ? "Fresh thoughts on connectivity and access."
        : "Celebrating community stories and strength.",
    likes: Math.floor(Math.random() * 5000),
    dislikes: 0,
    comments: Math.floor(Math.random() * 1000),
    reposts: Math.floor(Math.random() * 1000),
    views: Math.floor(Math.random() * 5_000_000),
    timestamp: new Date().toISOString(),
    imageUrl: Math.random() > 0.7 ? "https://picsum.photos/seed/new/600/300" : null,
    isReply: Math.random() > 0.8,
    parentPostId: null
  };
  POSTS.unshift(p);
  return p;
}
