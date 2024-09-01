import './contents.css';

import Image from 'next/image';
import Link from 'next/link';

interface Content {
  id: number;
  title: string;
  content: string;
  path: string;
  imagePath: string;
}
// TODO: add scraping module
export default function Contents({ list }: { list: Content[] }) {
  return (
    <section>
      {list.length ? (
        list.map((content) => (
          <Link
            className="contents-item-wrap"
            key={content.id}
            href={content.path}
          >
            <div>
              <div className="content-item-wrap">
                <div
                  className="post-list-wrap"
                  style={{
                    width: content.imagePath ? 'calc(100% - 100px)' : '100%',
                  }}
                >
                  <div className="padding-y-10">
                    <p className="content-item-title">{content.title}</p>
                  </div>
                  <div className="padding-y-10">
                    <p className="content-item-content">{content.content}</p>
                  </div>
                </div>
                {content.imagePath && (
                  <div className="content-image-wrap">
                    <Image
                      src={content.imagePath}
                      alt="국민건강보험공단"
                      width={100}
                      height={100}
                    />
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div>
          <h1>he</h1>
        </div>
      )}
    </section>
  );
}
