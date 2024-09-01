'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { BaseSyntheticEvent, useEffect, useState } from 'react';

import GithubIconDark from '@/assets/images/github-mark.svg';
import GithubIconLight from '@/assets/images/github-mark-white.svg';
import headerStyles from '@/components/header/header.module.css';

const contentsList = [
  {
    id: 1,
    title: 'POSTS',
    link: '/',
    imagePath: '/images/header-posts.png',
  },
  {
    id: 2,
    title: 'CONTENTS',
    link: '/contents',
    imagePath: '/images/header-contents.png',
  },
];

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const visible = prevScrollPos > currentScrollPos;

      if (currentScrollPos > 100) {
        setPrevScrollPos(currentScrollPos);
        setShowHeader(visible);
      } else {
        setShowHeader(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
  }, [prevScrollPos, showHeader]);

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    matchMedia.addEventListener('change', handleChange);
    return () => matchMedia.removeEventListener('change', handleChange);
  }, []);

  const activeDropdownHandler = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  useEffect(() => {
    setIsActive(false);
  }, [pathname, searchParams]);

  return (
    <header
      style={{
        top: showHeader ? '0' : '-60px',
        transition: 'top 0.3s',
      }}
    >
      <div className={headerStyles.wrap}>
        <Link href="/" className={headerStyles.titleWrap}>
          <Image
            src="/images/title-image.png"
            alt="메인 이미지"
            width={30}
            height={30}
          />
          <h2 className={headerStyles.logo}>Joselogs</h2>
        </Link>
        <div className={headerStyles.contentsWrap}>
          {contentsList.map((content) =>
            pathname === content.link ? (
              <div
                className={`${headerStyles.content} ${headerStyles.action}`}
                key={content.id}
              >
                <div
                  className={`${headerStyles.iconWrap} ${content.title === 'POSTS' ? headerStyles.postsAnimate : headerStyles.contentsAnimate}`}
                >
                  {content.title === 'POSTS' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="100%"
                      viewBox="0 -960 960 960"
                      width="100%"
                    >
                      <path d="M280-140v-480q0-25.06 17.5-42.53Q315-680 340-680h480q24.75 0 42.38 17.62Q880-644.75 880-620v340L680-80H340q-24.75 0-42.37-17.63Q280-115.25 280-140ZM81-725q-5-25 9.5-44.5T130-794l473-84q25-5 44.5 9t24.5 39l16 90h-60l-14-79-473 83 79 450v83q-20-2-35-15t-19-34L81-725Zm259 105v480h308v-172h172v-308H340Zm240 240Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="100%"
                      viewBox="0 -960 960 960"
                      width="100%"
                    >
                      <path d="M480-480q0-91 64.5-155.5T700-700q91 0 155.5 64.5T920-480H480ZM260-260q-91 0-155.5-64.5T40-480h440q0 91-64.5 155.5T260-260Zm220-220q-91 0-155.5-64.5T260-700q0-91 64.5-155.5T480-920v440Zm0 440v-440q91 0 155.5 64.5T700-260q0 91-64.5 155.5T480-40Z" />
                    </svg>
                  )}
                </div>
                <p>{content.title}</p>
              </div>
            ) : (
              <Link
                className={headerStyles.content}
                href={content.link}
                key={content.id}
              >
                <div
                  className={`${headerStyles.iconWrap} ${content.title === 'POSTS' ? headerStyles.postsAnimate : headerStyles.contentsAnimate}`}
                >
                  {content.title === 'POSTS' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="100%"
                      viewBox="0 -960 960 960"
                      width="100%"
                    >
                      <path d="M280-140v-480q0-25.06 17.5-42.53Q315-680 340-680h480q24.75 0 42.38 17.62Q880-644.75 880-620v340L680-80H340q-24.75 0-42.37-17.63Q280-115.25 280-140ZM81-725q-5-25 9.5-44.5T130-794l473-84q25-5 44.5 9t24.5 39l16 90h-60l-14-79-473 83 79 450v83q-20-2-35-15t-19-34L81-725Zm259 105v480h308v-172h172v-308H340Zm240 240Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="100%"
                      viewBox="0 -960 960 960"
                      width="100%"
                    >
                      <path d="M480-480q0-91 64.5-155.5T700-700q91 0 155.5 64.5T920-480H480ZM260-260q-91 0-155.5-64.5T40-480h440q0 91-64.5 155.5T260-260Zm220-220q-91 0-155.5-64.5T260-700q0-91 64.5-155.5T480-920v440Zm0 440v-440q91 0 155.5 64.5T700-260q0 91-64.5 155.5T480-40Z" />
                    </svg>
                  )}
                </div>
                <p>{content.title}</p>
              </Link>
            ),
          )}
        </div>
        <Link
          className={headerStyles.githubWrap}
          target="_blank"
          href="https://github.com/kiyoung92"
        >
          <div className={headerStyles.githubLink}>
            {isDarkMode ? <GithubIconLight /> : <GithubIconDark />}
          </div>
        </Link>
        <div
          className={`${headerStyles.dropdownWrap} ${isActive && headerStyles.activeDropdownWrap}`}
          role="button"
          tabIndex={0}
          onClick={(e) => activeDropdownHandler(e)}
          onKeyDown={() => {}}
          aria-label="Toggle dropdown"
        >
          <div className={headerStyles.dropdownLineWrap}>
            <div
              className={`${headerStyles.dropdownLine1} ${isActive && headerStyles.activeDropdownList1}`}
            />
            <div
              className={`${headerStyles.dropdownLine2} ${isActive && headerStyles.activeDropdownList2}`}
            />
            <div
              className={`${headerStyles.dropdownLine3} ${isActive && headerStyles.activeDropdownList3}`}
            />
          </div>
        </div>
      </div>
      <div
        className={`${headerStyles.dropdownContentsWrap} ${isActive && headerStyles.activeDropdownContentsWrap}`}
      >
        <div className={headerStyles.dropdownContents}>
          {contentsList.map((content) => (
            <Link
              key={content.id}
              className={headerStyles.dropdownContent}
              href={content.link}
            >
              {content.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
