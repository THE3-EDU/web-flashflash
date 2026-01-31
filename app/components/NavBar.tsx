'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const navs = [
  { name: 'HOME', path: '/home' },
  { name: 'ABOUT', path: '/about' },
  { name: 'WORK', path: '/work' },
  { name: 'CONTACT', path: '/contact' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [isWidening, setIsWidening] = useState(false);
  const [isIconMoving, setIsIconMoving] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    setCurrentPath(pathname);
    
    // 检测屏幕尺寸
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        handleCollapse();
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const handleExpand = () => {
    setIsAnimating(true);
    setIsExpanded(true);
    setTextOpacity(1); // 显示文字
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleCollapse = () => {
    setIsAnimating(true);
    setIsWidening(true);
    setTextOpacity(0); // 开始淡出文字
    
    // 先放宽一点
    setTimeout(() => {
      setIsWidening(false);
      setIsExpanded(false);
      
      // 然后收缩
      setTimeout(() => {
        setIsAnimating(false);
        // 收缩完成后，图标先向左移动再回到原位
        setIsIconMoving(true);
        setTimeout(() => {
          setIsIconMoving(false);
        }, 300);
      }, 100);
    }, 300);
  };

  const handleNavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating) return;
    
    if (isExpanded) {
      handleCollapse();
    } else {
      handleExpand();
    }
  };

  const isActive = (path: string) => {
    if (!mounted) return false;
    return currentPath === path;
  };

  const getWidth = () => {
    if (isExpanded) {
      // 在小屏幕时使用80vw，大屏幕时使用318px
      return isSmallScreen ? '80vw' : '318px';
    }
    if (isWidening) return '400px'; // 放宽一点
    return '44px';
  };

  const getHeight = () => {
    if (isExpanded) {
      // 在小屏幕时使用20vh，大屏幕时使用44px
      return isSmallScreen ? '30vh' : '44px';
    }
    return '44px';
  };

  const getBorderRadius = () => {
    if (isExpanded) return '10px';
    if (isWidening) return '20px'; // 放宽时更圆一点，创造拉伸效果
    return '50%';
  };

  const getTransform = () => {
    if (isWidening) return 'scaleX(1.1)'; // 添加水平拉伸效果
    return 'scaleX(1)';
  };

  return (
    <nav
      ref={navRef}
      className={`fixed bottom-9.5 left-1/2 flex items-center justify-center transition-all duration-300 ease-in-out ${
        !isExpanded ? 'hover:scale-110' : ''
      }`}
      style={{
        width: getWidth(),
        height: getHeight(),
        background: 'rgba(150,150,150,1)',
        borderRadius: getBorderRadius(),
        transform: `translateX(-50%) ${getTransform()}`,
        zIndex: 9999,
        overflow: 'hidden',
      }}
      onClick={handleNavClick}
    >
      {isExpanded ? (
        <ul className={`flex w-full h-full items-center justify-between px-7 ${
          isSmallScreen ? 'flex-col space-y-4 py-[5vh] text-[14px]' : 'flex-row  text-[10px]'
        }`} style={{ opacity: textOpacity, transition: 'opacity 0.5s ease-in-out' }}>
          {navs.map((item) => (
            <li key={item.name} className={`flex items-center ${
              isSmallScreen ? 'w-full justify-center' : 'h-full'
            }`}>
              <Link
                href={item.path}
                className={`font-bold transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-[rgb(196,253,172)]'
                    : 'text-black'
                }`}
                style={{
                  zIndex: 9999,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Image 
            src="/Icons/nav.svg" 
            alt="nav" 
            width={19} 
            height={19}
            className={`transition-all duration-300 ease-in-out ${
              isIconMoving ? 'transform -translate-x-1' : 'transform translate-x-0'
            }`}
          />
        </div>
      )}
    </nav>
  );
}