import Information from '@/components/information/information';
import Posts from '@/components/posts/posts';
import getPostsMetaData from '@/lib/posts-metadata';

export default function Home() {
  const postsData = getPostsMetaData();

  return (
    <main>
      <Information />
      <Posts list={postsData} />
    </main>
  );
}
