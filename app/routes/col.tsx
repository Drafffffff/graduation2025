
import type { Route } from "./+types/home";
import styles from "../style/col.module.css";
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
    gsap.from("#bg", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#descCard", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1 })
    gsap.from("#descp1", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1.1 })
    gsap.from("#descp2", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1.4 })
    gsap.from("#descCp3", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1.1 })
    gsap.from("#titlec", { x: -150, opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#titlec2", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from(SplitText.create("#subtitle", { type: "words ,chars" }).chars, {
      duration: 0.5,
      y: 100,
      autoAlpha: 0,
      stagger: 0.05,
      delay: 0.5
    });
  }, { scope: gsapContainer })

  return <div id="smooth-wrapper" className={styles.main} ref={gsapContainer}>
    <div id="smooth-content" >
      <div className={styles.main}>
        {/* <div className="w-[100vw] h-[100vh] bg-[#000] flex justify-center items-center  "> */}
        <div className="w-[100vw] h-[100vh] bg-[#000] grid grid-cols-[28px_2.5fr_3.5fr_4.5fr_1fr_28px] grid-rows-[28px_3fr_1.5fr_2.5fr_1.8fr] select-none  ">
          <div className={`${styles.hLine} absolute w-screen h-screen`}>
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
      <div className="bg-white w-[100vw] h-[100vh]"></div>
    </div>
  </div >;
}
