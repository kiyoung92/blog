import { promises as fs } from 'fs';

import Post from '@/components/post/post';

async function getPostData(postTitle: string) {
  const postsDirName = `posts/${decodeURIComponent(postTitle)}/index.md`;
  const postData = await fs.readFile(postsDirName, { encoding: 'utf-8' });

  return postData;
}

export type Params = {
  params: {
    title: string;
  };
};

export default async function Page({ params }: Params) {
  const html = await getPostData(params.title);

  return (
    <main>
      <Post html={html} />
    </main>
  );
}
