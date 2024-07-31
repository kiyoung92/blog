import { create } from 'zustand';

interface GlobalStroe {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  post: Post;
  setPost: (post: Post) => void;
}

interface Post {
  id: number;
  title: string;
  content: string;
  titleImagePath: string;
  date: string;
  description: string;
}

const useGlobalStore = create<GlobalStroe>((set) => ({
  posts: [],
  setPosts: (posts) => set((state) => ({ ...state, posts })),
  post: {
    id: 0,
    title: '',
    content: '',
    titleImagePath: '',
    date: '',
    description: '',
  },
  setPost: (post) => set((state) => ({ ...state, post })),
}));

export default useGlobalStore;
