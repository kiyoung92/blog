'use client';

import '@/components/header/header.css';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

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

  return (
    <header style={{ top: showHeader ? '0' : '-60px', transition: 'top 0.3s' }}>
      <div className="header-wrap">
        <Link href="/">
          <h2 className="header-logo">Joselogs</h2>
        </Link>
      </div>
    </header>
  );
}
