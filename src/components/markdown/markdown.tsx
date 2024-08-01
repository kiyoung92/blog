'use client';

import '@/components/markdown/markdown.css';

import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import c from 'highlight.js/lib/languages/c';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import plaintext from 'highlight.js/lib/languages/plaintext';
import powershell from 'highlight.js/lib/languages/powershell';
import python from 'highlight.js/lib/languages/python';
import scss from 'highlight.js/lib/languages/scss';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import reactHtmlParser from 'react-html-parser';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { getToc } from '@/lib/markdown';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('c', c);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('python', python);
hljs.registerLanguage('powershell', powershell);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('plaintext', plaintext);

export default function Markdown({ propsMarkdown }: { propsMarkdown: string }) {
  const [html, setHtml] = useState('');
  // const [toc, setToc] = useState([]);
  const toc = getToc({ content: propsMarkdown });

  useEffect(() => {
    async function markdownToHtml() {
      const parseHtml = await unified()
        .use(remarkHtml)
        .use(remarkParse)
        .use(remarkRehype, {
          allowDangerousHtml: true,
        })
        .use(rehypeSlug)
        .use(rehypeRaw)
        .use(remarkFrontmatter)
        .use(rehypeStringify)
        .use(remarkGfm)
        .process(propsMarkdown);

      const domparser = new DOMParser();
      const doc = domparser.parseFromString(parseHtml.toString(), 'text/html');
      doc.body.querySelectorAll('pre code').forEach((block) => {
        const originalCodeBlock = block;
        const copyButton = document.createElement('button');
        const copyData = document.createElement('p');

        copyData.style.display = 'none';
        copyData.textContent = block.textContent || '';
        copyData.classList.add('copy-data');
        copyButton.innerHTML = `<svg width="100%" height="100%" fill="var(--color)"><path d="M18 21h-6a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3zm-6-10a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z"></path><path d="M9.73 15H5.67A2.68 2.68 0 0 1 3 12.33V5.67A2.68 2.68 0 0 1 5.67 3h6.66A2.68 2.68 0 0 1 15 5.67V9.4h-2V5.67a.67.67 0 0 0-.67-.67H5.67a.67.67 0 0 0-.67.67v6.66a.67.67 0 0 0 .67.67h4.06z"></path></svg>`;
        copyButton.className = 'code-copy-button';

        originalCodeBlock.parentNode?.prepend(copyButton);
        originalCodeBlock.parentNode?.append(copyData);
        originalCodeBlock.innerHTML = hljs.highlight(block.textContent!, {
          language: block.classList[0]
            ? block.classList[0].split('-')[1]
            : 'plaintext',
        }).value;
      });

      const sanitizedData = DOMPurify.sanitize(doc.body.innerHTML);
      setHtml(sanitizedData);
    }

    function addClickEvent() {
      document.querySelectorAll('.code-copy-button').forEach((button) => {
        const originalButton = button;

        originalButton.addEventListener('click', () => {
          navigator.clipboard
            .writeText(
              button.closest('pre')?.querySelector('.copy-data')?.textContent ||
                '',
            )
            .then(() => {
              originalButton.innerHTML = `<svg viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg" height="26px" width="24px" fill="var(--color)"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;

              setTimeout(() => {
                originalButton.innerHTML = `<svg viewBox="0 0 24 24" fill="var(--color)"><path d="M18 21h-6a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3zm-6-10a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z"></path><path d="M9.73 15H5.67A2.68 2.68 0 0 1 3 12.33V5.67A2.68 2.68 0 0 1 5.67 3h6.66A2.68 2.68 0 0 1 15 5.67V9.4h-2V5.67a.67.67 0 0 0-.67-.67H5.67a.67.67 0 0 0-.67.67v6.66a.67.67 0 0 0 .67.67h4.06z"></path></svg>`;
              }, 1000);
            });
        });
      });
    }

    markdownToHtml();
    addClickEvent();
  }, [html, propsMarkdown]);

  return (
    <div className="markdown-wrap">
      <div className="markdown-content-wrap">{reactHtmlParser(html)}</div>
      <div className="markdown-toc-wrap">
        {toc?.map((item) => (
          <Link key={item.id} href={`#${item.link.toLowerCase()}`}>
            <p
              className="markdown-toc-content"
              style={{
                marginLeft: `${(item.indent - 1) * 20}px`,
              }}
            >
              {item.text}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
