import { promises as fs } from 'fs';
import yaml from 'js-yaml';

import Information from '@/components/information/information';
import Posts from '@/components/posts/posts';

function extractMetadata(markdownData: string): string | null {
  const match = markdownData.match(/---\s*([\s\S]*?)\s*---/);
  return match ? match[1].trim() : null;
}

function parseMetadataToJson(metadata: string): Record<string, string> | null {
  try {
    return yaml.load(metadata) as Record<string, string>;
  } catch (e) {
    return null;
  }
}

function extractFirstImagePath(markdownData: string): string | null {
  const match = markdownData.match(/!\[.*?\]\((.*?)\)/);
  return match ? match[1] : null;
}

export default async function Home() {
  const postsDirName = 'posts';
  const postDir = await fs.readdir(postsDirName);
  const response = await Promise.all(
    postDir.map(async (file, index) => {
      const markdownData = await fs.readFile(
        `${postsDirName}/${file}/index.md`,
        {
          encoding: 'utf-8',
        },
      );
      const metadata = extractMetadata(markdownData);
      const metadataJson = metadata ? parseMetadataToJson(metadata) : null;
      const firstImagePath = extractFirstImagePath(markdownData);

      if (!metadataJson) {
        return null;
      }

      return {
        id: index,
        title: metadataJson?.title,
        folderPath: file,
        titleImagePath: firstImagePath ? `/posts/${firstImagePath}` : null,
        description: metadataJson?.description,
        date: metadataJson?.date,
      };
    }),
  );

  if (!response) {
    return <div>404</div>;
  }

  response.sort((a, b) => {
    if (a && b && a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return new Date().getTime();
  });

  return (
    <main>
      <Information />
      <Posts list={response} />
    </main>
  );
}
