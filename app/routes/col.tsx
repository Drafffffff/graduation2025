
import type { Route } from "./+types/home";
import ColorThief from "color-thief-ts";
import chroma from "chroma-js"
import styles from "../style/col.module.css";
import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome } from '@uiw/react-color';
import { Alpha, Hue, ShadeSlider, Saturation, hsvaToHslaString } from '@uiw/react-color';
import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);
export function meta({ }: Route.MetaArgs) {

  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const gsapContainer = useRef<HTMLDivElement>(null)
  const [MainColorPalette, setMainColorPalette] = useState<string[]>([]);
  const [SecColorPalette, setSecColorPalette] = useState<string[]>([]);
  const [hex, setHex] = useState<string>("#000000");
  useGSAP((context, contextSafe) => {
    const ytrans = 28 + (window.innerHeight - 28) * 6 / 17.6
    const xtrans = (28 + (window.innerWidth - 28 - 28) * 5 / 23)
    gsap.set("#title", { x: xtrans, y: ytrans })
    // gsap.set("#subtitle", { x: xtrans, y: ytrans })
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });
    gsap.from("#hLine1", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.1 })
    gsap.from("#hLine2", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.2 })
    gsap.from("#hLine3", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.4 })
    gsap.from("#hLine4", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.1 })
    gsap.from("#vLine1", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.4 })
    gsap.from("#vLine2", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.3 })
    gsap.from("#vLine3", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.1 })
    gsap.from("#vLine4", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.2 })
    gsap.from("#vLine5", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    // gsap.from("#bg", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#descCard", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1 })
    gsap.from("#descp1", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1.1 })
    gsap.from("#descp2", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1.4 })
    // gsap.from("#descCp3", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1.1 })
    gsap.from("#titlec", { x: -150, opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#titlec2", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#bluerect", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#greenrect", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#orangerect", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#bluecir", { scale: 0, opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.8 })
    gsap.from("#greencir", { scale: 0, opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.8 })
    gsap.from("#orangecir", { scale: 0, opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.8 })
    gsap.from(SplitText.create("#subtitle", { type: "words ,chars" }).chars, {
      duration: 0.5,
      y: 100,
      autoAlpha: 0,
      stagger: 0.05,
      delay: 0.5
    });
  }, { scope: gsapContainer })

  const [curImg, setCurImg] = useState(0);
  useEffect(() => {
    function generateColorPalette(inputColor: string): string[] {
      const color = chroma(inputColor);
      const [hue, saturation, lightness] = color.hsl();

      const lightnessSteps = Array.from({ length: 8 }, (_, i) =>
        0.1 + (0.8 * i) / 7
      );

      return lightnessSteps.map(l =>
        chroma.hsl(hue, saturation, l).hex()
      );
    }
    const getPalette = async () => {
      try {
        console.log(curImg);
        const colorThief = new ColorThief();
        const palette = await colorThief.getPaletteAsync(`/col/${curImg + 1}.png`, 9);
        const dominantColor = await colorThief.getColorAsync(`/col/${curImg + 1}.png`);
        setMainColorPalette(generateColorPalette(dominantColor));
        setSecColorPalette(palette)
      } catch (error) {
        console.error("获取调色板失败:", error);
      }
    };
    getPalette();


  }, [curImg])

  return <div id="smooth-wrapper" className={styles.main} ref={gsapContainer}>
    <div id="smooth-content" >
      <div className={styles.main}>
        {/* <div className="w-[100vw] h-[100vh] bg-[#000] flex justify-center items-center  "> */}
        <div className="w-[100vw] h-[100vh] bg-[#000] grid grid-cols-[28px_2.5fr_3.5fr_4.5fr_1fr_28px] grid-rows-[28px_3fr_1.5fr_2.5fr_1.8fr] select-none  ">

          <div className={`${styles.hLine} z-0 absolute w-screen h-screen`}>
            <div id="hLine1" className={`${styles.hLine1} w-screen h-[1px] bg-white`}></div>
            <div id="hLine2" className={`${styles.hLine2} w-screen h-[1px] bg-white`}></div>
            <div id="hLine3" className={`${styles.hLine3} w-screen h-[1px] bg-white`}></div>
            <div id="hLine4" className={`${styles.hLine4} w-screen h-[1px] bg-white`}></div>
          </div>
          <div className={`${styles.vLine} absolute w-screen h-screen`}>
            <div id="vLine1" className={`${styles.vLine1} w-[1px] h-screen bg-white`}></div>
            <div id="vLine2" className={`${styles.vLine2} w-[1px] h-screen bg-white`}></div>
            <div id="vLine3" className={`${styles.vLine3} w-[1px] h-screen bg-white`}></div>
            <div id="vLine4" className={`${styles.vLine4} w-[1px] h-screen bg-white`}></div>
            <div id="vLine5" className={`${styles.vLine5} w-[1px] h-screen bg-white`}></div>
          </div>
          <svg id="colblue" width="100%" preserveAspectRatio="none meet" className="row-[2_/_3] col-[5_/_6]" viewBox="0 0 171 171" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect id="bluerect" x="0.81543" y="0.242188" width="169.931" height="169.936" fill="#17C8EB" />
            <circle id="bluecir" cx="85.7812" cy="85.2106" r="62.5583" fill="#095D6E" />
          </svg>
          <svg id="colgreen" className="row-[2_/_3] col-[2_/_3]" width="206" height="206" viewBox="0 0 206 206" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect id="greenrect" x="1.21985" y="1.23633" width="203.765" height="203.77" fill="#B4DC19" stroke="white" />
            <circle id="greencir" cx="103.102" cy="103.122" r="74.8818" fill="#10503C" stroke="white" />
          </svg>
          <svg id="colorange" width="100%" preserveAspectRatio="none meet" height="100%" className="z-10 row-[4_/_6] col-[4_/_5] " viewBox="0 0 763 465" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="orangerect" d="M0 0.0664062H762.5V790.568H0V0.0664062Z" fill="#E77E41" />
            <ellipse id="orangecir" cx="381.251" cy="395.317" rx="280.706" ry="251.007" fill="#E1D355" />
          </svg>
          <p id="subtitle" className={`${styles.subTitle} row-[2_/_3] col-[3_/_5]  text-white font-thin leading-none -translate-y-8 text-[10rem] z-10 self-end select-none`}>Color Algorithm</p>
          <p id="title" className={`${styles.title} absolute  text-white font-bold leading-none text-[10rem] select-none`}>配色算法</p>
          <p id="titlec" className={`${styles.titlec} row-[2_/_3] col-[2_/_3] justify-self-end text-white font-bold leading-none text-[10rem] select-none`}>“</p>
          <p id="titlec2" className={`${styles.titlec} row-[3_/_4] col-[5_/_6] justify-self-start text-white font-bold leading-none text-[10rem] select-none`}>”</p>
          <div id="descCard" className={`${styles.desc} row-[4_/_5] col-[2_/_3]  text-white font-medium text-[36px] bg-[#9B4E82] flex justify-center flex-col`}>
            <p id="descp1">“</p>
            <p id="descp2" className="text-center">一步一步地思考问题。</p>
            <p id="descp3" className="text-right">”</p>
          </div>
        </div>
      </div>
      <div className="h-[10rem] w-screen">
        <div className={`${styles.vLine} absolute w-screen h-full`}>
          <div id="vLine1" className={`${styles.vLine1} w-[1px] h-full bg-black`}></div>
          <div id="vLine2" className={`${styles.vLine2} w-[1px] h-full bg-black`}></div>
          <div id="vLine3" className={`${styles.vLine3} w-[1px] h-full bg-black`}></div>
          <div id="vLine4" className={`${styles.vLine4} w-[1px] h-full bg-black`}></div>
          <div id="vLine5" className={`${styles.vLine5} w-[1px] h-full bg-black`}></div>
        </div>
      </div>
      <div className="bg-white w-[100vw]">
        <div className={`${styles.vLine} absolute w-screen h-full`}>
          <div id="vLine1" className={`${styles.vLine1} w-[1px] h-full bg-black`}></div>
          <div id="vLine2" className={`${styles.vLine2} w-[1px] h-full bg-black`}></div>
          <div id="vLine3" className={`${styles.vLine3} w-[1px] h-full bg-black`}></div>
          <div id="vLine4" className={`${styles.vLine4} w-[1px] h-full bg-black`}></div>
          <div id="vLine5" className={`${styles.vLine5} w-[1px] h-full bg-black`}></div>
        </div>

        <div className={`${styles.hLine} z-0 absolute w-screen h-full`}>
          <div id="hLine1" className={`absolute w-screen h-[1px] bg-black translate-y-[calc(8rem-3px)]`}></div>
          <div id="hLine2" className={`absolute w-screen h-[1px] bg-black translate-y-[calc(8rem+925px)]`}></div>
          <div id="hLine2" className={`absolute w-screen h-[1px] bg-black translate-y-[calc(8rem+925px+10rem)]`}></div>
          <div id="hLine2" className={`absolute w-screen h-[1px] bg-black translate-y-[calc(8rem+925px+10rem+10rem)]`}></div>
          <div id="hLine2" className={`absolute w-screen h-[1px] bg-black translate-y-[calc(8rem+925px+10rem+20rem)]`}></div>

          {/* <div id="hLine3" className={`absolute w-screen h-[1px] bg-black`}></div> */}
          {/* <div id="hLine4" className={`absolute w-screen h-[1px] bg-black`}></div> */}
        </div>
        <div className="px-[28px] ">
          <p className="row-[2_/_3] col-[2_/_3] text-[5rem] leading-none font-thin">颜色提取</p>
          <p className=" text-[2.8rem] leading-none text-gray-400 font-normal ">THE GENERAL PROBLEM-SOLVER</p>
        </div>
        <Swiper
          slidesPerView={1.8}
          centeredSlides={true}
          spaceBetween={30}
          // loop={true}
          modules={[Navigation]}
          onSlideChange={(swiper) => setCurImg(swiper.activeIndex)}
          className="mySwiper mt-[8rem] select-none"
        >
          {Array.from({ length: 11 }).map((_, index) => {
            return <SwiperSlide id={`slide-${index}`} key={index} className="">
              <img src={`/col/${index + 1}.png`} className="h-[50rem] w-[80vw] object-cover " />
            </SwiperSlide>
          })}
        </Swiper>
        <div id="mainColor" className=" colorPaletter flex px-[28px] h-[10rem] select-none">
          <div className="w-[calc((100vw-56px)*5/23)] flex flex-col justify-end">
            <p className="font-thin leading-none text-[40px]">主色</p>
            <p className="font-thin leading-none text-[40px] text-[#787878]">Main Color</p>
          </div>
          <div className="flex items-end">
            {Array.from({ length: 8 }).map((_, index) => {
              const color = `${MainColorPalette[index] ? `${MainColorPalette[index]}` : '#000'}`
              let fontColor = '#000'
              if (chroma(color).hsl()[2] > 0.5) {
                fontColor = '#000'
              } else {
                fontColor = '#fff'
              }

              return <div id={`maincolor-${index}`} key={index} className={`${styles.colorCard} color-card w-[12rem] rounded-tl-lg rounded-tr-lg `} style={
                {
                  transform: `translateX( -${index * 20}px )`,
                  backgroundColor: color,
                }
              }>
                <p className="" style={
                  {
                    color: fontColor,
                  } as React.CSSProperties

                }>
                  {color}
                </p>
              </div>
            })}
          </div>
        </div>

        <div id="secColor" className="colorPaletter overflow-hidden flex px-[28px] h-[10rem] select-none">
          <div className="w-[calc((100vw-56px)*5/23)] flex flex-col justify-end">
            <p className="font-thin leading-none text-[40px]">辅色</p>
            <p className="font-thin leading-none text-[40px] text-[#787878]">Secondary color</p>
          </div>
          <div className="flex items-end">
            {Array.from({ length: 8 }).map((_, index) => {
              const color = `${SecColorPalette[index] ? `${SecColorPalette[index]}` : '#000'}`
              let fontColor = '#000'
              if (chroma(color).hsl()[2] > 0.5) {
                fontColor = '#000'
              } else {
                fontColor = '#fff'
              }

              return <div id={`maincolor-${index}`} key={index} className={`${styles.colorCard} color-card w-[12rem] rounded-tl-lg rounded-tr-lg  `} style={
                {
                  transform: `translateX( -${index * 20}px )`,
                  backgroundColor: color,
                }
              }>
                <p className="" style={
                  {
                    color: fontColor,
                  } as React.CSSProperties

                }>
                  {color}
                </p>
              </div>
            })}
          </div>
        </div>
        <div id="bwColor" className="colorPaletter flex px-[28px] h-[10rem] select-none">
          <div className="w-[calc((100vw-56px)*5/23)] flex flex-col justify-end">
            <p className="font-thin leading-none text-[40px]">灰度</p>
            <p className="font-thin leading-none text-[40px] text-[#787878]">Grayscale</p>
          </div>
          <div className="flex items-end">
            {Array.from({ length: 8 }).map((_, index) => {
              const color = `#${index + 2}${index + 2}${index + 2}`
              let fontColor = '#000'
              if (chroma(color).hsl()[2] > 0.5) {
                fontColor = '#000'
              } else {
                fontColor = '#fff'
              }

              return <div id={`maincolor-${index}`} key={index} className={`${styles.colorCard} color-card w-[12rem] rounded-tl-lg rounded-tr-lg  `} style={
                {
                  transform: `translateX( -${index * 20}px )`,
                  backgroundColor: color,
                }
              }>
                <p className="" style={
                  {
                    color: `${fontColor}`,
                  } as React.CSSProperties
                }>
                  {color}
                </p>
              </div>
            })}
          </div>
        </div>
      </div>
      <div className="h-[20rem] w-screen">
        <div className={`${styles.vLine} absolute w-screen h-full`}>
          <div id="vLine1" className={`${styles.vLine1} w-[1px] h-full bg-black`}></div>
          <div id="vLine2" className={`${styles.vLine2} w-[1px] h-full bg-black`}></div>
          <div id="vLine3" className={`${styles.vLine3} w-[1px] h-full bg-black`}></div>
          <div id="vLine4" className={`${styles.vLine4} w-[1px] h-full bg-black`}></div>
          <div id="vLine5" className={`${styles.vLine5} w-[1px] h-full bg-black`}></div>
        </div>
      </div>

      <div className=" w-screen">
        <div className={`${styles.vLine} absolute w-screen h-full`}>
          <div id="vLine1" className={`${styles.vLine1} w-[1px] h-full bg-black`}></div>
          <div id="vLine2" className={`${styles.vLine2} w-[1px] h-full bg-black`}></div>
          <div id="vLine3" className={`${styles.vLine3} w-[1px] h-full bg-black`}></div>
          <div id="vLine4" className={`${styles.vLine4} w-[1px] h-full bg-black`}></div>
          <div id="vLine5" className={`${styles.vLine5} w-[1px] h-full bg-black`}></div>
        </div>

        <div className={`${styles.hLine} z-0 absolute w-screen h-full`}>
          <div id="hLine1" className={`absolute w-screen h-[1px] bg-black translate-y-[calc(8rem-3px)]`}></div>
          <div id="hLine2" className={`absolute w-screen h-[1px] bg-black translate-y-[calc(8rem+925px)]`}></div>
          <div id="hLine2" className={`absolute w-screen h-[1px] bg-black translate-y-[calc(8rem+925px+10rem)]`}></div>
          <div id="hLine2" className={`absolute w-screen h-[1px] bg-black translate-y-[calc(8rem+925px+10rem+10rem)]`}></div>
          <div id="hLine2" className={`absolute w-screen h-[1px] bg-black translate-y-[calc(8rem+925px+10rem+20rem)]`}></div>
        </div>
        <div className="px-[28px] ">
          <p className="row-[2_/_3] col-[2_/_3] text-[5rem] leading-none font-thin">颜色提取</p>
          <p className=" text-[2.8rem] leading-none text-gray-400 font-normal ">THE GENERAL PROBLEM-SOLVER</p>
        </div>
        <div className="flex justify-center items-center h-[20rem]">
          <Sketch
            color={hex}
            onChange={(color) => {
              setHex(color.hex);
            }}
          />

          <Chrome
            color={hex}
            onChange={(color) => {
              setHex(color.hex);
            }}
          />

          <Wheel
            color={hex}
            onChange={(color) => {
              setHex(color.hex);
            }}
          />

          <Colorful
            color={hex}
            onChange={(color) => {
              setHex(color.hex);
            }}
          />
        </div>
      </div>
    </div>
  </div >;
}
