// import rehypeRaw from 'rehype-raw';
// import remarkFrontmatter from 'remark-frontmatter';
// import remarkGfm from 'remark-gfm';
// import remarkHtml from 'remark-html';

interface TocContent {
  content: string;
}

export function getToc({ content }: TocContent) {
  const regex = /^(#|##|###) (.*$)/gim;
  if (content.match(regex)) {
    return content.match(regex)?.map((item: string, index: number) => {
      if (item.includes('http') || item.includes('https')) {
        return {
          id: index,
          text: '',
          link: '',
          indent: item.match(/#/g)!.length,
        };
      }
      return {
        id: index,
        text: item.replace(/#/g, ''),
        link: item
          .replace(/[^\w\s가-힣-]/g, '')
          .replace(' ', '')
          .replace(/ /g, '-'),
        indent: item.match(/#/g)!.length,
      };
    });
  }

  return [];
}

export function extractFirstImagePath({
  markdownData,
}: {
  markdownData: string;
}) {
  const regex = /!\[.*\]\((.*)\)/;
  const match = markdownData.match(regex);

  return match ? match[1] : null;
}
