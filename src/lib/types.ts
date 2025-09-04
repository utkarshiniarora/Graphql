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
