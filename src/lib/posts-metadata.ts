import fs from 'fs';

import { extractFirstImagePath } from '@/lib/markdown';
import {
  extractMetadata,
  parseMetadataToJson,
} from '@/lib/parser/metadate.parser';

type PostsMetaData = {
  id: number;
  title: string;
  folderPath: string;
  url: string;
  titleImagePath: string | null;
  description: string;
  date: string;
  tags: string[];
} | null;

export default function getPostsMetaData(): PostsMetaData[] {
  const postsDirName = 'posts';
  const postDir = fs.readdirSync(postsDirName);

  const response = postDir.map((file, index) => {
    const markdownData = fs.readFileSync(`${postsDirName}/${file}/index.md`, {
      encoding: 'utf-8',
    });
    const metadata = extractMetadata({ markdownData });
    const metadataJson = metadata ? parseMetadataToJson({ metadata }) : null;
    const firstImagePath = extractFirstImagePath({ markdownData });

    if (!metadataJson) {
      return null;
    }

    return {
      id: index,
      title: metadataJson.title,
      folderPath: file,
      url: `/posts/${file}`,
      titleImagePath: firstImagePath ? `/posts/${firstImagePath}` : null,
      description: metadataJson.description,
      date: metadataJson.date,
      tags: metadataJson.tags,
    };
  });

  response.sort((a, b) => {
    if (a && b && a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return new Date().getTime();
  });

  return response;
}
