import '@/components/post/post.css';

import Markdown from '@/components/markdown/markdown';

type Props = {
  html: string;
  title: string | undefined;
};

export default function Post({ html, title }: Props) {
  return (
    <section className="markdown-body">
      <h1>{title}</h1>
      <Markdown propsMarkdown={html} />
    </section>
  );
}
