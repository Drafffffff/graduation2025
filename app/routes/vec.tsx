
import type { Route } from "./+types/home";
import styles from "../style/vec.module.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

export function meta({ }: Route.MetaArgs) {

  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const gsapContainer = useRef<HTMLDivElement>(null)
  useGSAP((context, contextSafe) => {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });


    gsap.from("#hLine1", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.1 })
    gsap.from("#hLine2", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.2 })
    gsap.from("#vLine1", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.4 })
    gsap.from("#vLine2", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.3 })
    gsap.from("#vLine3", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.1 })
    gsap.from("#vLine4", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.2 })
    gsap.from("#vLine5", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#vLine6", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.25 })
    gsap.from("#vLine7", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.45 })
    gsap.from("#bg", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#descCard", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1 })
    gsap.from("#descp1", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1.1 })
    gsap.from("#descp2", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1.4 })
    gsap.from("#descCp3", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1.1 })
    gsap.from("#titlec", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#titlec2", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from(".rotatable-svg", { scale: 0.1, opacity: 0, duration: 3, ease: "power4.inOut", delay: 0.5 })
    gsap.from(SplitText.create("#subtitle", { type: "words ,chars" }).chars, {
      duration: 0.5,
      y: 100,
      autoAlpha: 0,
      stagger: 0.05,
      delay: 0.5
    });

  }, { scope: gsapContainer })


  // const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
  //   console.log(e);
  //
  // }
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const svgs = document.querySelectorAll<SVGSVGElement>(".rotatable-svg");
    svgs.forEach((svg) => {
      const rect = svg.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      svg.style.transform = `rotate(${angle}deg)`;
    });
  };
  return <div id="smooth-wrapper" className={styles.main} ref={gsapContainer}>
    <div id="smooth-content" >
      <div className={` bg-[#000]`} onMouseMove={handleMouseMove}>
        <div className={`absolute w-screen h-screen pointer-events-none z-10`}>
          <div className={`${styles.hLine} absolute w-screen h-screen`}>
            <div id="hLine1" className={`${styles.hLine1} w-screen h-[1px] bg-white`}></div>
            <div id="hLine2" className={`${styles.hLine2} w-screen h-[1px] bg-white`}></div>
          </div>
          <div className={`${styles.vLine} absolute w-screen h-screen`}>
            <div id="vLine1" className={`${styles.vLine1} w-[1px] h-screen bg-white`}></div>
            <div id="vLine2" className={`${styles.vLine2} w-[1px] h-screen bg-white`}></div>
            <div id="vLine3" className={`${styles.vLine3} w-[1px] h-screen bg-white`}></div>
            <div id="vLine4" className={`${styles.vLine4} w-[1px] h-screen bg-white`}></div>
            <div id="vLine5" className={`${styles.vLine5} w-[1px] h-screen bg-white`}></div>
            <div id="vLine6" className={`${styles.vLine6} w-[1px] h-screen bg-white`}></div>
            <div id="vLine7" className={`${styles.vLine7} w-[1px] h-screen bg-white`}></div>
          </div>
        </div>
        <p id="title" className="absolute translate-x-[calc(33.333vh+28px)] translate-y-[33.333vh] text-white leading-none font-bold text-[10rem]">语义向量</p>
        <p id="titlec" className="absolute translate-x-[calc(33.333vh+28px-160px)]  text-white leading-none font-bold text-[10rem]">“</p>
        <p id="titlec2" className="absolute translate-x-[calc(133.333vh+28px)] translate-y-[33.333vh]  text-white leading-none font-bold text-[10rem]">”</p>
        <p id="subtitle" className={`${styles.subTitle} absolute row-[1_/_2] col-[2_/_5] translate-x-[calc(33.3vh+28px)] translate-y-[calc(33.3vh-160px)] text-white font-thin leading-none text-[10rem] z-10 self-end select-none`}>Semantic Vector</p>
        <div id="descCard" className={`${styles.desc} absolute translate-x-[calc(28px+133.3vh)] translate-y-[66.6vh] h-[33.3vh] w-[calc(100vw-28px-28px-133.3vh)]  text-white font-medium text-[36px] bg-[#093974] flex justify-center flex-col`}>
          <p id="descp1">“</p>
          <p id="descp2" className="text-center">用数学空间表示语义。</p>
          <p id="descp3" className="text-right">”</p>
        </div>
        <div className={` w-[100vw] h-[100vh] bg-[#000] flex justify-start items-start px-[28px]`}>
          <div className={`${styles.landingGrid} `} >
            {
              Array.from({ length: 15 }, (_, i) => {
                return <div key={i} className="flex justify-center items-center">
                  <svg width="146" height="277" viewBox="0 0 146 277"
                    className="rotatable-svg mix-blend-screen"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M73 1L143.148 274.75H2.85194L73 1Z" stroke="#707070" strokeWidth="3" />
                  </svg>
                </div>
              })
            }
          </div>
        </div>
        <div className="w-[100vw] h-[100vh] bg-[#fff] flex justify-center items-center  ">
        </div>
      </div>
    </div>
  </div>;
}
