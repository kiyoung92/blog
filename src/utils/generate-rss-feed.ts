import { Feed } from 'feed';
import { writeFileSync } from 'fs';

import { blogConfig } from '@/config/blog-config';
import getPostsMetaData from '@/lib/posts-metadata';

export default function generateRssFeed() {
  const blogUrl = blogConfig.url;

  const feed = new Feed({
    id: blogUrl,
    title: blogConfig.title,
    description: blogConfig.description,
    link: blogConfig.url,
    feedLinks: {
      rss2: `${blogUrl}/feed.xml`,
      json: `${blogUrl}/feed.json`,
      atom: `${blogUrl}/atom.xml`,
    },
    updated: new Date(),
    copyright: '',
  });

  getPostsMetaData().forEach((post) => {
    feed.addItem({
      title: post!.title,
      link: `${blogUrl}${post!.url}`,
      description: post!.description,
      date: new Date(post!.date),
    });
  });

  writeFileSync('./public/feed.xml', feed.rss2(), { encoding: 'utf-8' });
  writeFileSync('./public/atom.xml', feed.atom1(), { encoding: 'utf-8' });
  writeFileSync('./public/feed.json', feed.json1(), { encoding: 'utf-8' });
}

generateRssFeed();
