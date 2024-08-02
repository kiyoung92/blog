import { MetadataRoute } from 'next';

import { blogConfig } from '@/config/blog-config';
import getPostsMetaData from '@/lib/posts-metadata';

const defaultSiteMap: MetadataRoute.Sitemap = [
  {
    url: blogConfig.url,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const postsMetaData = getPostsMetaData();
  const sitemapFromPosts: MetadataRoute.Sitemap = postsMetaData.map((post) => {
    return {
      url: blogConfig.url + post!.url,
      lastModified: new Date(post!.date),
      changeFrequency: 'daily',
      priority: 0.7,
    };
  });

  return [...defaultSiteMap, ...sitemapFromPosts];
}
