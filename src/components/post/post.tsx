import '@/components/post/post.css';

import Markdown from '@/components/markdown/markdown';

type Props = {
  html: string;
  title: string | undefined;
  tags: string[] | undefined;
};

export default function Post({ html, title, tags }: Props) {
  return (
    <section className="markdown-body">
      <h1>{title}</h1>
      <div className="post-tags-wrap">
        {tags?.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <Markdown propsMarkdown={html} />
    </section>
  );
}
