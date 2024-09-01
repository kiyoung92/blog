import Contents from '@/components/contents/contents';
import Information from '@/components/information/information';

type Content = {
  id: number;
  title: string;
  content: string;
  path: string;
  imagePath: string;
};

export function generateMetadata() {
  return {
    title: 'Joselogs | Contents',
    description: '컨텐츠',
    alternates: {
      canonical: `https://blog.joselogs.com/contents`,
    },
    openGraph: {
      title: 'Joselogs | Contents',
      description: '컨텐츠',
      images: [
        {
          url: 'https://blog.joselogs.com/images/title-image.png',
          width: 960,
          height: 960,
          alt: 'Joselogs Contents',
        },
      ],
    },
  };
}

export default function Page() {
  const contentList: Content[] = [
    {
      id: 0,
      title: '국민건강보험',
      content: '자격득실확인',
      path: '/contents/nhis',
      imagePath: '/images/nhis-title.svg',
    },
  ];

  return (
    <main>
      <Information />
      <Contents list={contentList} />
    </main>
  );
}
