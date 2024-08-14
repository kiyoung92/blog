---
title: 'Test Blog'
date: '2024-08-02T08:35:41.033Z'
description: '블로그 테스트 중 입니다.'
tags: ['Typescript', 'NextJS']
---

![Github_Logo](make-blog/index.png)

NextJS로 블로그를 만들었다.

여러가지 템플릿이 있긴 하지만 또 직접 만드는게 재미있으니깐 ~ 🌟

하지만 만들다 보니 괜히 NextJS로 만들었나 싶기도 하고... ㅋㅋㅋㅋ

프레임워크의 기능을 많이 사용하지 않는데 Vite로 React를 쓸 걸 그랬다.

그래도 뭐 랜더링이 빠르니깐 ~!

이번에 블로그를 만들면서 핵심 로직 몇개 적어보려고 한다.

파일은 깃허브 블로그처럼 md파일을 작성하고 이미지를 직접 폴더에 넣는 형식으로 진행하였다.

에잇! 서버는 나중에 하나하나씩 추가하자!

<br><br><br>

# 1. 파일을 읽고 랜더링하기 좋게 리스트로 만들자.

메인 페이지에 리스트를 만들어주기 위해서 `fs` 모듈을 사용하였다.

````typescript
interface PostData {
  id: number;
  title: string;
  file: string;
  content: string;
  imagePath: string;
  createdAt: string;
}

const postDir = await fs.readdir('public/posts');
const response: PostData[] = [];

for (const file of postDir) {
  const stats = await fs.stat(`public/posts/${file}`);
  const title = file.split('.')[0];
  const fileData = await fs
    .readFile(`public/posts/${file}`, {
      encoding: 'utf-8',
    })
    .then((data) => {
      return data
        .replace(/(#+\s)/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/(\*\*|__)(.*?)\1/g, '$2')
        .replace(/(\*|_)(.*?)\1/g, '$2')
        .replace(/^(\s*)([*\-+]|\d+\.)\s+/gm, '$1')
        .replace(/^\s*>+\s?/gm, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/^ {4}/gm, '')
        .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
        .replace(/\n-{3,}\n/g, '\n')
        .replace(/\n/g, ' ')
        .replace(/<br>/g, '')
        .trim();
    });

  const obj = {
    title,
    file: `/public/posts/${file}`,
    content: fileData,
    imagePath: `/posts-images/${title}.png`,
    createdAt: stats.birthtimeMs,
  };

  response.push(obj);
}

response.sort((a, b) => b.createdAt - a.createdAt);
response.forEach((item, index) => {
  item.id = index + 1;
  item.createdAt = new Date(item.createdAt).toLocaleDateString('ko-KR');
});
````

<br>

1. `fs`로 블로그 게시글이 있는 폴더 안에 파일들을 읽어온 후에
2. 각 파일별 정렬을 위해 `fs.stat`로 파일의 생성 시간을 Milisecond로 획득 후
3. Markdown 내용의 특수 문자를 제거하고 리스트에 미리보기로 보여줄 게시물의 내용을 만들어 준다.
4. 그리고 화면에 랜더링 해줄 데이터를 만들어주면 끝!

- 내용 요약에서 `<br>` 이 보이길래 글쓰면서 정규식 하나 추가!
- 방금 또 삭선 처리가 안되어서... 플러그인 하나 추가!

~삭선 테스트트!!~

글을 쓰면서 테스트 아닌 테스트를 진행하고 있다.

<br>

```json
[
  {
    "title": "test",
    "file": "/public/posts/test.md",
    "content": "블로그 만들기  NextJS로 블로그를 만들었다.  여러가지 템플릿이 있긴 하지만 또 직접 만드는게 재미있으니깐 ~ 🌟",
    "imagePath": "/posts-images/test.png",
    "createdAt": "2024. 7. 23.",
    "id": 1
  }
]
```

역시.. JSON은 이쁘다..

나중에는 Markdown 파일을 내용을 utf-8로 읽으면서 첫번째 h1 태그에 있는 내용을 가져와서 `title`로 써야겠다.

<br><br><br>

## 2. Markdown > HTML 라이브러리와 플러그인을 적용하자.

### 2-1 RemarkJS 적용

우선 변환해주는 라이브러리가 많았지만 너무 무겁고 느리고 랜더링되는데 시간이 너무 오래 걸려서 가벼운 라이브러리를 찾았다.

### [RemarkJS Github](https://github.com/remarkjs/remark)

요요 remarkjs를 사용했는데 너무 가볍고 필요한 부분을 플러그인 형태로 지원하니 너무 좋았다.

```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

const result = await unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStringify)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .process(data);
```

<p align="center" style="color: #ccc; font-size: 12px;">remarkjs plugins 적용</p>

캬 ~! 정말 편하다.

입맛대로 바꿀 수 있고 그 사이에 로직을 추가할 수 있으니 너무 좋았다.

`삭선`, `HTML`, `<br>` 등등 적용이 되지 않는다면 깃헙에 가서 찾아서 플러그인을 적용해주면 된다!

<br>

```xml
<p align="center" style="color: #ccc; font-size: 12px;">remarkjs plugins 적용</p>
```

<p align="center" style="color: #ccc; font-size: 12px;">HTML 적용</p>

이런 식으로 HTML로 스타일도 지정해 줄 수 있고 ~

<br>

### 2-2 플러그인 설명

<br><br><br>

## 3. highlight.js로 코드를 이쁘게 만들자.

https://unifiedjs.com/learn/recipe/remark-html/
