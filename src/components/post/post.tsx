import '@/components/post/post.css';

import Markdown from '@/components/markdown/markdown';

type Props = {
  html: string;
};

export default function Post({ html }: Props) {
  return (
    <section className="markdown-body">
      <Markdown propsMarkdown={html} />
    </section>
  );
}
