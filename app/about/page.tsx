'use client'

import React from 'react'
import Image from 'next/image'
import LogoAnimation from '../components/logoAnimation'
import dynamic from 'next/dynamic'
import { getAssetPath } from '../utils/path'

const RevealFromBottom = dynamic(() => import('../components/RevealFromBottom'), { ssr: false })
const FadeInUp = dynamic(() => import('../components/FadeInUp'), { ssr: false })

const About = () => {
  const aboutText = [
    {
      title: "Who We Are?",
      content: "We leverage AI and CG as core creative tools, seamlessly integrating AIGC technologies into every stage of the commercial creative and production process, creating breakthrough visual experiences for brands. We gather creative minds from around the world, control the entire chain from planning, creativity, and production, and implement it in one stop. Design combines curiosity, beauty, love, and technology.",
      keywords: ["keywords", "keywords"]
    },
    {
      title: "Our Services",
      content: "We leverage AI and CG as core creative tools, seamlessly integrating AIGC technologies into every stage of the commercial creative and production process, creating breakthrough visual experiences for brands. We gather creative minds from around the world, control the entire chain from planning, creativity, and production, and implement it in one stop. Design combines curiosity, beauty, love, and technology.",
      keywords: ["keywords", "keywords"]
    }
  ]

  const services = [
    {
      title: "Mixed Reality Video",
      image: "/contact/bg.png",
      alt: "Service 1",
      xxlhoverTextSize: "3.6rem",
      xlhoverTextSize: "2.7rem",
      lghoverTextSize: "2.1rem",
      mdhoverTextSize: "1.5rem"
    },
    {
      title: "CG Film",
      image: "/contact/bg.png",
      alt: "Service 2",
      xxlhoverTextSize: "3.6rem",
      xlhoverTextSize: "2.7rem",
      lghoverTextSize: "2.1rem",
      mdhoverTextSize: "1.5rem"
    },
    {
      title: "DOOH",
      image: "/contact/bg.png",
      alt: "Service 3",
      xxlhoverTextSize: "3.6rem",
      xlhoverTextSize: "2.7rem",
      lghoverTextSize: "2.1rem",
      mdhoverTextSize: "1.5rem"
    },
    {
      title: "Exhibition(Ar&Mapping)",
      image: "/contact/bg.png",
      alt: "Service 4",
      xxlhoverTextSize: "3.6rem",
      xlhoverTextSize: "2.7rem",
      lghoverTextSize: "2.1rem",
      mdhoverTextSize: "1.5rem"
    },
    {
      title: "AI Generated Film",
      image: "/contact/bg.png",
      alt: "Service 5",
      xxlhoverTextSize: "3.6rem",
      xlhoverTextSize: "2.7rem",
      lghoverTextSize: "2.1rem",
      mdhoverTextSize: "1.5rem"
    }
  ]

  // 公司介绍图片
  const aboutItems = [
    {
      title: "☉ Old_Town_Excursion.webp",
      image: "/about/us/1.png",
      alt: "Service 1"
    },
    {
      title: "☉ Old_Town_Excursion.webp",
      image: "/about/us/2.png",
      alt: "Service 2"
    },
    {
      title: "☉ Old_Town_Excursion.webp",
      image: "/about/us/3.png",
      alt: "Service 3"
    },
    {
      title: "☉ Old_Town_Excursion.webp",
      image:  "/about/us/4.png",
      alt: "Service 4"
    },
    {
      title: "☉ Old_Town_Excursion.webp",
      image: "/about/us/6.png",
      alt: "Service 5"
    },
    {
      title: "☉ Old_Town_Excursion.webp",
      image:"/about/us/5.png",
      alt: "Service 6"
    }
  ];
  
  return (
    <div className="w-full bg-black relative min-w-[1000px] blackbg">
      
        <div className="flex items-center justify-center">
          
            <Image
              src={getAssetPath("/about/bg.png")}
              alt="about"
              height={1000}
              width={500}
              className="object-cover object-top z-0 h-[100vh]"
              priority
            />
         
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 h-[100vh]">
          <FadeInUp>
            <Image src={getAssetPath("/about/title.svg")} alt="about" width={1000} height={1000} className="w-[70%] h-[100%]" />
          </FadeInUp>
        </div>
      

      {/* 公司介绍*/}
      <section className="mt-[5vh] text-white px-[2.3vw] pb-[5vh]">
        <div className="border-t-1 border-[#BDABE4] text-[#BDABE4] text-[0.75rem] 2xl:text-[1rem] pt-2">
          About flashFLASH
        </div>
        <div className='flex flex-col gap-28 2xl:gap-36 ml-[10vw] mr-[4.5vw] my-[9vh] '>
          {aboutText.map((section, index) => (
            <div key={index} className="flex flex-row gap-15 2xl:gap-21 items-start justify-center">
              {/* 左边标题 */}
              
                <div className="text-[1.5rem] md:text-[2.1rem] lg:text-[2.3rem] xl:text-[2.7rem] 2xl:text-[3.6rem] w-[50%] lg:w-[30%]">
                  <RevealFromBottom position='center'>
                  {section.title}
                  </RevealFromBottom>
                </div>
              
              <div className="flex flex-col w-[70%] gap-7 2xl:gap-8">
                <FadeInUp y={10}>
                  {/* 右边段落 */}
                  <div className="text-[1rem] lg:text-[1.43rem] 2xl:text-[1.55vw] leading-[1.3] 2xl:leading-[1.36]">
                      {section.content}
                  </div>
                </FadeInUp>
               
                  <div className="flex flex-row gap-4 2xl:gap-6">
                    
                    {section.keywords.map((keyword, keywordIndex) => (
                   
                      <div key={keywordIndex} className="">
                        <FadeInUp y={10}>
                          <div className='text-sm 2xl:text-xl px-8 2xl:px-9 py-1 bg-[#BDABE4] text-black rounded-lg'>
                            {keyword}
                          </div>
                        </FadeInUp>
                      </div>
                     
                    ))}
                   
                  </div>
               
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[5vh] 2xl:mt-[6.5vh] text-white px-[2.3vw] pb-[5vh] 2xl:pb-[3vh]">
        <div className="border-t-1 border-[#BDABE4] text-[#BDABE4] text-[0.75rem] 2xl:text-[1rem] pt-2">
          Services
        </div>
        {/* 服务卡片 */}
        <div className="flex flex-col items-center gap-7 2xl:gap-10 mt-15 lg:mt-20 xl:mt-25 2xl:mt-32 px-[3.3vw]">
        {services.map((service, index) => (
            <div
            key={index}
            className="
              group relative
              h-20 lg:h-26 xl:h-31 2xl:h-40
              w-full overflow-hidden rounded-3xl
              cursor-pointer
              transition-all duration-700 ease-in-out
              hover:h-140 lg:hover:h-170 xl:hover:h-200 2xl:hover:h-270
            "
          >
              {/* 图片 */}
              <Image
                src={service.image}
                alt={service.alt}
                fill
                className="
                  object-cover object-top
                  transition-all duration-700 ease-in-out
                  group-hover:object-center
                "
                style={{ objectPosition: "center 10%" }}
              />

            {/* 文字容器 */}
            <div
              className="
                absolute inset-0
                flex items-center justify-center leading-none
              "
            >
              <div
                className={`
                  text-white
                  text-[1.5rem]
                  ${service.mdhoverTextSize ? `md:text-[${service.mdhoverTextSize}]` : ''}
                  ${service.lghoverTextSize ? `lg:text-[${service.lghoverTextSize}]` : ''}
                  ${service.xlhoverTextSize ? `xl:text-[${service.xlhoverTextSize}]` : ''}
                  ${service.xxlhoverTextSize ? `2xl:text-[${service.xxlhoverTextSize}]` : ''}
                  transition-all duration-700 ease-in-out
                  absolute
                  left-1/2 top-1/2
                  -translate-x-1/2 -translate-y-1/2
                  origin-bottom-left
                  group-hover:left-[40px]
                  group-hover:top-auto
                  group-hover:bottom-[20px]
                  group-hover:translate-x-0
                  group-hover:translate-y-0
                  group-hover:scale-[2.5]
                  leading-none
                `}
              >
                {service.title}
              </div>
            </div>
          </div>
        ))}
        </div>
      </section>
      <section className="mt-[20vh] lg:mt-[20vh] xl:mt-[25vh] 2xl:mt-[6.5vh] text-white pb-[5vh] 2xl:pb-[0.1vh]">
        <div className="border-t-1 border-[#BDABE4] text-[#BDABE4] text-[0.75rem] 2xl:text-[1rem] pt-2 mx-[2.3vw]">
          Select Clients
        </div>
        {/* 横向自动轮播 */}
        <div className="my-6 2xl:my-12 overflow-hidden w-full flex justify-center items-center py-[3vh]">
          <div className="flex animate-scroll-horizontal">
          <div className="flex-shrink-0 w-full">
            <Image src={getAssetPath("/about/brands.svg")} alt="1" width={1000} height={200} className="h-[30vh] w-full" />
          </div>
          <div className="flex-shrink-0 w-full">
            <Image src={getAssetPath("/about/brands.svg")} alt="2" width={1000} height={200} className="h-[30vh] w-full" />
          </div>
          <div className="flex-shrink-0 w-full">
            <Image src={getAssetPath("/about/brands.svg")} alt="1" width={1000} height={200} className="h-[30vh] w-full" />
          </div>
          <div className="flex-shrink-0 w-full">
            <Image src={getAssetPath("/about/brands.svg")} alt="2" width={1000} height={200} className="h-[30vh] w-full" />
          </div>
          </div>
        </div>
      </section>
      <section className="mt-0 xl:mt-[8vh] 2xl:mt-[13.5vh] text-white">
        <div className="border-t-1 border-[#BDABE4] text-[#BDABE4] text-[0.75rem] 2xl:text-[1rem] pt-2 mx-[2.3vw]">
          This is us
        </div>
        <div className='mx-[5.1vw] my-[9vh] flex flex-col items-center gap-9.5 2xl:gap-14'>
          {[...Array(2)].map((_, rowIndex) => (
            <div key={rowIndex} className='flex flex-row gap-5 2xl:gap-8'>
              {[...Array(3)].map((_, colIndex) => {
                const itemIndex = rowIndex * 3 + colIndex;
                const item = aboutItems[itemIndex];

                return (
                  <div key={colIndex} className='flex flex-col gap-2 2xl:gap-5'>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={500}
                      height={500}
                      className="
                        rounded-2xl
                        hover:rounded-[300px]
                        transition-all
                        duration-500
                        [transition-timing-function:cubic-bezier(0.77,0,0.175,1)]
                        object-cover
                      "
                    />
                    <div className='text-[1.4rem] 2xl:text-[1.85rem] text-white'>
                      <RevealFromBottom position='center'>
                        <div className='flex text-left w-full'>
                          {item.title}
                        </div>
                      </RevealFromBottom>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className='mt-[20vh]'>
           <LogoAnimation />
        </div>
      </section>
      
      {/* 全页面半透明覆盖层 */}
      {/* <div className="absolute inset-0 bg-opacity-20 pointer-events-none z-50 -mt-204">
        <Image
          src={getAssetPath("/about/test.png")}
          alt="overlay"
          width={1920}
          height={3000}
          className="object-contain opacity-30"
          style={{ objectPosition: 'center top', width: '100vw'}}
        />
      </div> */}
    </div>
  )
}

export default About;
