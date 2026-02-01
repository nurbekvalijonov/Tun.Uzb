export type ArticleCategory = 'POLITICS' | 'TECH' | 'CULTURE' | 'ECONOMY';

export type Language = 'en' | 'uz' | 'ru';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface ContentBlock {
  type: 'text' | 'heading' | 'quote' | 'image' | 'list' | 'video' | 'audio' | 'model3d';
  content: string;
  metadata?: {
    caption?: string;
    style?: string;
  };
}

export interface Comment {
    id: string;
    author: string;
    text: string;
    timestamp: string;
    likes: number;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  author: Author;
  publishedAt: string;
  readTime: number; // in minutes
  coverImage: string;
  content: ContentBlock[];
  tags: string[];
  comments: Comment[];
}

export interface ShortVideo {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  youtubeId: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}