import { promises as fs } from 'fs';
import { Metadata } from 'next';

import Post from '@/components/post/post';
import {
  extractFirstImagePath,
  extractMetadata,
  parseMetadataToJson,
} from '@/lib/parser/metadate.parser';

async function getPostData(postTitle: string) {
  const postsDirName = `posts/${decodeURIComponent(postTitle)}/index.md`;
  const postData = await fs.readFile(postsDirName, { encoding: 'utf-8' });

  return postData;
}

export type Params = {
  params: {
    title: string;
    folderPath: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const markdownData = await getPostData(params.title);
  const metadata = extractMetadata({ markdownData });
  const metadataJson = metadata ? parseMetadataToJson({ metadata }) : null;
  const firstImagePath = extractFirstImagePath({ markdownData });

  return {
    title: metadataJson?.title,
    description: metadataJson?.description,
    alternates: {
      canonical: `/posts/${params.title}`,
    },
    openGraph: {
      title: metadataJson?.title,
      description: metadataJson?.description,
      images: [
        `https://blog.joselogs.com/${firstImagePath}` ||
          'https://blog.joselogs.com/images/title-image.png',
      ],
      url: `/posts/${params.title}`,
    },
  };
}

export default async function Page({ params }: Params) {
  const html = await getPostData(params.title);

  return (
    <main>
      <Post html={html} />
    </main>
  );
}
