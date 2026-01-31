'use client';

import { useEffect, useState } from 'react';

export default function Cursor({ children }: { children: React.ReactNode }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handle = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', handle);

    return () => {
      document.removeEventListener('mousemove', handle);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <>
      {children}
      {!isMobile && (
        <div
          className="cursor"
          style={{
            left: `${mouse.x}px`,
            top: `${mouse.y}px`,
          }}
        />
      )}
    </>
  );
}