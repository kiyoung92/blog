// import { promises as fs } from 'fs';
import fs from 'fs';
import { Metadata } from 'next';

import Post from '@/components/post/post';
import {
  extractFirstImagePath,
  extractMetadata,
  parseMetadataToJson,
} from '@/lib/parser/metadate.parser';

function getPostData(postTitle: string) {
  const postsDirName = `posts/${decodeURIComponent(postTitle)}/index.md`;
  const postData = fs.readFileSync(postsDirName, { encoding: 'utf-8' });

  return postData;
}

export type Params = {
  params: {
    title: string;
    folderPath: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const markdownData = getPostData(params.title);
  const metadata = extractMetadata({ markdownData });
  const metadataJson = metadata
    ? parseMetadataToJson({ metadata })
    : {
        title: 'Joselogs',
        description: '기록하기',
      };
  const firstImagePath = extractFirstImagePath({ markdownData });

  // TODO: add keywords, author, twitter, languages
  return {
    title: `${metadataJson?.title}`,
    description: metadataJson?.description,
    alternates: {
      canonical: `https://blog.joselogs.com/`,
    },
    openGraph: {
      title: metadataJson?.title,
      description: metadataJson?.description,
      images: [
        {
          url:
            `https://blog.joselogs.com/posts/${firstImagePath}` ||
            'https://blog.joselogs.com/images/title-image.png',
          width: 960,
          height: 960,
          alt: metadataJson?.title,
        },
      ],
    },
  };
}

export default function Page({ params }: Params) {
  const html = getPostData(params.title);
  const metadata = extractMetadata({ markdownData: html });
  const metadataJson = metadata
    ? parseMetadataToJson({ metadata })
    : {
        title: 'Joselogs',
        description: '기록하기',
        tags: [],
      };

  return (
    <main>
      <Post html={html} title={metadataJson?.title} tags={metadataJson?.tags} />
    </main>
  );
}
