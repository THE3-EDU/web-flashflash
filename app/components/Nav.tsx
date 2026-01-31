'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const FadeInUp = dynamic(() => import('./FadeInUp'), { ssr: false })

const getTimeString = (locale: string, timeZone: string) =>
  new Date().toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  });

const Nav = () => {
  const [londonTime, setLondonTime] = useState('--:--');
  const [shanghaiTime, setShanghaiTime] = useState('--:--');

  useEffect(() => {

    const updateTimes = () => {
      setLondonTime(getTimeString('en-GB', 'Europe/London'));
      setShanghaiTime(getTimeString('zh-CN', 'Asia/Shanghai'));
    };
    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="w-full flex pl-[2.2vw] pr-[2.5vw] absolute top-[4.85vh] z-50 h-[50px] pointer-events-none">
      {/* 左侧：介绍+城市时间，md以上显示 */}
      {/* <div className="hidden lg:flex flex-col items-start flex-1"> */}
      <FadeInUp>
      <div className="flex flex-col items-start flex-1">
        <div className="flex gap-[2.2vw] text-white text-[1.6vw] md:text-[0.83vw] leading-[1] opacity-70">
          <div>
            <div>
              flashFLASH is a digital art team specializing<br />
              in creating imaginative and style-forward visual<br />
              marketing for global brands.
            </div>
          </div>
          {/* 中间：城市时间，左对齐 */}
          <div className="flex flex-col items-start ml-[1vw]">
            <div className="flex gap-[2.3vw]">
              <div className="italic uppercase">
                LONDON,UK
              </div>
              <div className="italic">
                {londonTime} GMT+1
              </div>
            </div>
            <div className="flex gap-[1.5vw]">
              <div className="italic uppercase">
                SHANGHAI,CN
              </div>
              <div className="italic">
                {shanghaiTime} GMT+8
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 右侧logo，始终显示 */}
      <div className="flex items-start w-[20vw] md:w-[10.6vw]">
        <Image src="/Logo/logo.svg" alt="logo" width={200} height={50} />
      </div>
      </FadeInUp>
    </nav>
  );
};

export default Nav;
