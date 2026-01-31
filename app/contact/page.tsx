'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const RevealFromBottom = dynamic(() => import('../components/RevealFromBottom'), { ssr: false })
const FadeInUp = dynamic(() => import('../components/FadeInUp'), { ssr: false })
const AnimatedText = dynamic(() => import('../components/AnimatedText'), { ssr: false })
const FadeIn = dynamic(() => import('../components/FadeIn'), { ssr: false })

export default function ContactPage() {
    const memberListRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);

    const speed = 60; // pixels per second
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsClient(true);
        let offset = 0;
        let lastTime = performance.now();
      
        function loop(now: number) {
          const delta = now - lastTime;
          lastTime = now;
          offset += (delta / 1000) * speed;
      
          offset %= 600;
      
          if (scrollRef.current) {
            scrollRef.current.style.transform = `translateY(-${offset}px)`;
          }
      
          requestAnimationFrame(loop);
        }
      
        requestAnimationFrame(loop);
      }, []);
      return (
        <div className='relative w-full h-full bg-black'>
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
            className="relative h-[100vh] min-h-[500px] 2xl:min-h-[700px] w-full min-w-[750px] bg-cover bg-center flex flex-col items-center justify-center py-32"
            style={{ backgroundImage: 'url(/contact/bg.png)' }}
        >
    {/* <div className="relative h-[100vh] min-h-[500px] 2xl:min-h-[700px] w-full min-w-[750px] bg-cover bg-center flex flex-col items-center justify-center py-32" style={{backgroundImage: 'url(/contact/bg.png)'}}> */}
        <div className="w-[54vw] h-[25vw] max-w-[1033px] max-h-[484px] min-w-[700px] min-h-[328px] 2xl:min-w-[800px] 2xl:min-h-[470px]">
        {/* 主体内容区 */}
            <FadeInUp delay={0}>
                <div className="flex gap-[0.3vw] w-full h-full">
                
                    {/* 左侧信息区 */}
                    <div className="flex flex-col w-[18.4%] h-full">
                        <div className="flex flex-col flex-1 gap-1">
                            {/* 时间与天气（矮一点） */}
                            <div className="h-[17.8%] justify-start items-left bg-black/66 rounded-md overflow-hidden flex flex-col pl-[2vw] md:pl-[0.65vw] pt-[0.06vh]">
                                <div className="text-[1.8rem] xl:text-[2.1rem] 2xl:text-[2.7rem] text-white">
                                    <AnimatedText text="Hello" />
                                </div>
                            </div>
                            {/* 社交图标 */}
                            <div className="h-[42.6%] grid grid-cols-3 gap-0.5 ">
                                
                                <a href="https://instagram.com/your_instagram" target="_blank" rel="noopener noreferrer" className="bg-black/66 rounded-md flex items-center justify-center w-full h-full">
                                <FadeIn>
                                    <Image src="/contact/icons/ins.svg" alt="ins" width={27} height={27} className='w-[46%]'/>
                                </FadeIn>
                                    
                                </a>
                                <a href="https://behance.net/your_behance" target="_blank" rel="noopener noreferrer" className="aspect-square bg-black/66 rounded-md flex items-center justify-center w-full h-full">
                                <FadeIn>
                                    <Image src="/contact/icons/be.svg" alt="be" width={30} height={24} className='w-[51%]'/>
                                </FadeIn>
                                </a>
                                <a href="https://linkedin.com/in/your_linkedin" target="_blank" rel="noopener noreferrer" className="aspect-square bg-black/66 rounded-md flex items-center justify-center w-full h-full">
                                <FadeIn>
                                    <Image src="/contact/icons/in.svg" alt="in" width={27} height={27} className='w-[46%]'/>
                                </FadeIn>
                                </a>
                                <a href="https://douyin.com/your_douyin" target="_blank" rel="noopener noreferrer" className="aspect-square bg-black/66 rounded-md flex items-center justify-center w-full h-full">
                                <FadeIn>
                                    <Image src="/contact/icons/dy.svg" alt="dy" width={24} height={24} className='w-[41%]'/>
                                </FadeIn>
                                </a>
                                <a href="https://xiaohongshu.com/your_xiaohongshu" target="_blank" rel="noopener noreferrer" className="aspect-square bg-black/66 rounded-md flex items-center justify-center w-full h-full">
                                <FadeIn>
                                    <Image src="/contact/icons/xhs.svg" alt="xhs" width={40} height={24} className='w-[66%]'/>
                                </FadeIn>
                                </a>
                                <a href="https://twitter.com/your_twitter" target="_blank" rel="noopener noreferrer" className="aspect-square bg-black/66 rounded-md flex items-center justify-center w-full h-full">
                                <FadeIn>
                                    <Image src="/contact/icons/x.svg" alt="x" width={27} height={27} className='w-[51%]' />
                                </FadeIn>
                                </a>
                                <a href="https://spotify.com/your_spotify" target="_blank" rel="noopener noreferrer" className="aspect-square bg-black/66 rounded-md flex items-center justify-center w-full h-full">
                                <FadeIn>
                                    <Image src="/contact/icons/spotify.svg" alt="spotify" width={27} height={27} className='w-[44%]' />
                                </FadeIn>
                                </a>
                                <div className="aspect-square bg-black/66 rounded-md flex items-center justify-center w-full h-full"></div>
                                <div className="aspect-square bg-black/66 rounded-md flex items-center justify-center w-full h-full"></div>
                    
                            </div>
                            {/* 营业时间（高一点） */}
                            <div className="h-[39.6%] relative bg-black/66 rounded-md overflow-hidden flex flex-col px-3 py-2">
                                <FadeIn position='start'>
                                    <div className="text-[0.47rem] xl:text-[0.47rem] 2xl:text-[0.65rem] text-gray-200">Open from 9 to 6</div>
                                </FadeIn>
                                {/* 星期 */}
                                
                                <div className="mt-auto">
                                    <div className="text-[1rem] xl:text-[1.2rem] 2xl:text-[1.7rem] leading-[0.9] text-white mb-2">
                                        <div className='flex flex-col text-left'>
                                            <RevealFromBottom delay={0}>
                                                <div className='text-left'>Monday</div>
                                            </RevealFromBottom>
                                            <RevealFromBottom delay={0.1}>
                                                <div className='text-left'>Tuesday</div>
                                            </RevealFromBottom>
                                            <RevealFromBottom delay={0.2}>
                                                <div className='text-left'>Wednesday</div>
                                            </RevealFromBottom>
                                            <RevealFromBottom delay={0.3}>
                                                <div className='text-left'>Thursday</div>
                                            </RevealFromBottom>
                                            <RevealFromBottom delay={0.4}>
                                                <div className='text-left'>Friday</div>
                                            </RevealFromBottom>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 地址区 */}
                    <div className="relative w-[17.4%] rounded-md overflow-hidden h-full">
                        {/* 背景图层 */}
                        <div className="absolute inset-0">
                            <Image
                            src="/contact/map.png"
                            alt=""
                            fill
                            className="object-cover opacity-30"
                            />
                        </div>

                        {/* 半透明黑色蒙版 */}
                        <div className="absolute inset-0 bg-black/66" />

                        {/* 内容层 */}
                        <div className="relative flex flex-col justify-between p-3 h-full">
                            <div>
                            <div className="text-[1.1rem] xl:text-[1.2rem] 2xl:text-[1.7rem] font-light leading-[1.05] text-white">
                                <RevealFromBottom position='start' delay={0}>
                                    33-5605 de
                                </RevealFromBottom>
                                <RevealFromBottom position='start' delay={0.1}>
                                    Gaspe
                                </RevealFromBottom>
                                <RevealFromBottom position='start' delay={0.2}>
                                    Montreal
                                </RevealFromBottom>
                                <RevealFromBottom position='start' delay={0.3}>
                                    Quebec
                                </RevealFromBottom>
                            </div>
                            </div>
                            <button 
                                className="flex w-full flex-col cursor-pointer" 
                                onClick={() => {
                                    window.open('https://www.google.com/maps/place/33-5605+de+Gaspe,+Montreal,+Quebec+H2T+2A4,+Canada/@45.501897,-73.566501,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc91a531f33a1b5:0x50b828d4883a888e!8m2!3d45.501897!4d-73.5639261!16s%2Fg%2F11c48t4xzn?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D', '_blank');
                                }}
                            >

                                <FadeIn position='center' delay={0}>
                                    <div className="flex items-center justify-between w-full h-full">
                                        <div className="text-[11px] text-gray-200 leading-[1] text-left">
                                            Directions<br/>Google Maps
                                        </div>
                                        <Image src="/contact/icons/map.svg" alt="map" width={20} height={20} />
                                    </div>
                                </FadeIn>
                            </button>
                        </div>
                    </div>
                    {/* 城市图片区 + 联系方式区块 */}
                    <div className="flex flex-col flex-1 gap-1 w-[37%] h-full">
                        <div className="relative rounded-md overflow-hidden h-[86.4%]">
                            {/* 背景图层 */}
                            <div className="absolute inset-0">
                                <Image
                                    src="/contact/place.png"
                                    alt=""
                                    fill
                                    className="object-cover opacity-75 "
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-transparent" />
                            </div>

                            {/* 内容层 */}
                            <div className="relative flex flex-col justify-between p-[0.8vw] h-full">
                                <div>
                                    <div className="text-[2rem] xl:text-[2rem] 2xl:text-[3rem] leading-[1.2] text-white">
                                        <AnimatedText text="London" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/* 联系方式区块 */}
                    <div className="w-full flex flex-row gap-1 h-[13.6%]">
                        <div className="flex-1 bg-black/66 rounded-md flex flex-col justify-center pl-2 py-2 text-white w-[51%]">
                            <FadeIn position='center' delay={0}>
                                <div className="flex items-center justify-between w-full h-full">
                                    <div className="flex flex-col">
                                        <div className="text-[0.6rem] xl:text-[0.7rem] 2xl:text-[0.9rem] font-bold">Phone</div>
                                        <div className="text-[0.4rem] xl:text-[0.5rem] 2xl:text-[0.7rem] font-light leading-[1]">+15149039288</div>
                                    </div>
                                    <button
                                        className="flex w-[20%] md:w-[25%] lg:w-[20%] cursor-pointer max-w-[44px] mr-[1vw]"
                                        onClick={() => {
                                            window.location.href = "tel:+15149039288";
                                        }}
                                    >
                                        <Image
                                            src="/contact/icons/phone.svg"
                                            alt="phone"
                                            width={32}
                                            height={32}
                                            className="w-full h-full"
                                        />
                                    </button>
                                
                                </div>
                            </FadeIn>
                        </div>

                        <div className="flex-1 bg-black/66 rounded-md flex flex-col justify-center pl-2 py-2 text-white w-[49%]">
                            <FadeIn position='center' delay={0}>
                                <div className="flex items-center justify-between w-full h-full">
                                    <div className="flex flex-col leading-[1] justify-center">
                                        <div className="text-[0.6rem] xl:text-[0.7rem] 2xl:text-[0.9rem] font-bold mb-[0.2vh]">Email</div>
                                        <div className="text-[0.4rem] xl:text-[0.5rem] 2xl:text-[0.7rem] font-light leading-[1.1]">flashflash_studio<br/>@163.com</div>
                                    </div>
                                    <button
                                        className="flex w-[20%] md:w-[25%] lg:w-[20%] cursor-pointer max-w-[44px] mr-[1vw]"
                                        onClick={() => {
                                            window.location.href = "mailto:flashflash_studio@163.com";
                                        }}
                                    >
                                        <Image
                                            src="/contact/icons/email.svg"
                                            alt="email"
                                            width={32}
                                            height={32}
                                            className="w-full h-full"
                                        />
                                    </button>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                    </div>
                    {/* 成员区 */}
                    <div className="w-[7.6%] overflow-hidden rounded-md h-full">
                        <div
                            ref={memberListRef}
                            className="relative w-[100%] h-[600px]"
                        >
                            <div
                                ref={scrollRef}
                                className="flex flex-col items-center animate-scroll-avatars"
                                style={isClient ? {} : { transform: 'translateY(0px)' }}
                            >
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={`original-${i}`} className="w-full h-[100px]">
                                    <Image
                                    src={`/contact/member/${i}.png`}
                                    alt={`member${i}`}
                                    width={100}
                                    height={100}
                                    className="object-cover w-full h-full"
                                    />
                                </div>
                                ))}
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={`copy-${i}`} className="w-full h-[100px]">
                                    <Image
                                    src={`/contact/member/${i}.png`}
                                    alt={`member-copy-${i}`}
                                    width={100}
                                    height={100}
                                    className="object-cover w-full h-full"
                                    />
                                </div>
                                ))}
                            </div>
                            </div>
                    </div>
                    {/* 互动区 */}
                    <div className="flex flex-col justify-between items-center w-[19.8%] bg-black/66 rounded-md px-[1vw] lg:px-[0.7vw] py-[1vh] 2xl:py-[0.8vh] h-full">
                        <div className="flex flex-col gap-0.5">
                            <div className="text-[0.6rem] xl:text-[0.6rem] 2xl:text-[0.85rem] text-white font-light">
                                <AnimatedText text="NEWSLETTER" />
                            </div>
                            <FadeIn position='center'>
                                <div className="text-[0.6rem] xl:text-[0.6rem] 2xl:text-[0.84rem] text-white leading-[0.9]">Subscribe to the flashFLASH newsletter to get the latest insights into our exploration of emerging futures.</div>
                            </FadeIn>
                            
                        </div>
                        <div className="flex flex-col gap-[1vh] lg:gap-[1vh] xl:gap-[1.4vh] items-center mb-[3.3vh] lg:mb-[4.3vh] xl:mb-[4.3vh] 2xl:mb-[5.3vh] justify-center">
                            <input
                                placeholder="Name"
                                className=" min-w-[68px] min-h-[68px] text-[0.5rem] lg:text-[0.5rem] xl:text-[0.6rem] 2xl:text-[0.85rem] w-14 l-14 lg:w-14 lg:h-14 xl:w-18 xl:h-18 2xl:w-24 2xl:h-24 max-w-[94px] max-h-[94px] rounded-full border-2 border-white bg-transparent text-white text-center placeholder-white outline-none"
                                type="text"
                            />
                            <input
                                placeholder="Email"
                                className=" min-w-[68px] min-h-[68px] text-[0.5rem] lg:text-[0.5rem] xl:text-[0.6rem] 2xl:text-[0.85rem] w-14 l-14 lg:w-14 lg:h-14 xl:w-18 xl:h-18 2xl:w-24 2xl:h-24 max-w-[94px] max-h-[94px] rounded-full border-2 border-white bg-transparent text-white text-center placeholder-white outline-none"
                                type="email"
                            />
                            <button
                                className="font-bold min-w-[68px] min-h-[68px] lg:w-14 lg:h-14 xl:w-18 xl:h-18 2xl:w-24 2xl:h-24 max-w-[94px] max-h-[94px] rounded-full bg-white text-black text-[0.5rem] lg:text-[0.5rem] xl:text-[0.6rem] 2xl:text-[0.85rem] flex items-center justify-center"
                            >
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>
                
                </div>
            </FadeInUp>
        </div>
    {/* </div> */}
    </motion.div>
    </div>
  );
}
