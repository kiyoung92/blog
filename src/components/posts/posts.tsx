import '@/components/posts/posts.css';

import Image from 'next/image';
import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  titleImagePath: string | null;
  description: string;
  folderPath: string;
  date: string;
  tags: string[] | null;
} | null;

export default function Posts({ list }: { list: Post[] }) {
  return (
    <section>
      {list.map(
        (postData) =>
          postData && (
            <Link
              className="posts-item-wrap"
              key={postData.id}
              href={`/posts/${postData.folderPath}`}
            >
              <div className="post-item-wrap">
                <div className="post-content-wrap">
                  <div
                    className="post-list-wrap"
                    style={{
                      width: postData.titleImagePath
                        ? 'calc(100% - 120px)'
                        : '100%',
                    }}
                  >
                    <div className="padding-y-10">
                      <p className="post-item-title">{postData.title}</p>
                    </div>
                    <div className="padding-y-10">
                      <p className="post-item-content">
                        {postData.description}
                      </p>
                    </div>
                    <div className="posts-date-tags-wrap">
                      <p className="post-item-date">
                        {new Date(postData.date).toLocaleDateString('ko-KR')}
                      </p>
                      <div className="posts-tags-wrap">
                        {postData?.tags?.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {postData.titleImagePath && (
                    <div className="post-image-wrap">
                      <Image
                        src={postData.titleImagePath}
                        alt={postData.title}
                        width={120}
                        height={120}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ),
      )}
    </section>
  );
}
