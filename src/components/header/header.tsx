'use client';

import '@/components/header/header.css';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import GithubIconDark from '@/assets/images/github-mark.svg';
import GithubIconLight from '@/assets/images/github-mark-white.svg';

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <header style={{ top: showHeader ? '0' : '-60px', transition: 'top 0.3s' }}>
      <div className="header-wrap">
        <Link href="/">
          <h2 className="header-logo">Joselogs</h2>
        </Link>
        <Link
          className="header-github-log-link"
          target="_blank"
          href="https://github.com/kiyoung92"
        >
          {isDarkMode ? <GithubIconLight /> : <GithubIconDark />}
        </Link>
      </div>
    </header>
  );
}
