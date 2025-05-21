import type { Route } from "./+types/home";
import styles from "../style/lay.module.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin);

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
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });


    gsap.fromTo('.svgpath', { duration: 1, drawSVG: 0, ease: "power4.inOut" }, { duration: 1, drawSVG: "100%", stagger: { amount: 0.05, from: "random" }, delay: 0.5 })

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
          <svg width="82" height="83" className="row-[2_/_3] col-[2_/_3] " viewBox="0 0 82 83" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="svgpath" cx="57.7465" cy="24.8073" r="23.3347" stroke="white" />
            <rect className="svgpath" x="0.94458" y="1.47266" width="80.1367" height="80.1387" stroke="white" />
            <path className="svgpath" d="M81.6213 82.1113L0.602295 0.972656" stroke="white" />
          </svg>
          <svg width="171" height="171" className="row-[2_/_3] col-[2_/_3] self-end justify-self-end" viewBox="0 0 171 171" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className="svgpath" x="1.22681" y="0.785156" width="168.931" height="168.936" stroke="white" />
            <path className="svgpath" d="M169.444 0.537109L0.620361 170.221" stroke="white" />
            <circle className="svgpath" cx="119.146" cy="119.923" r="49.7983" stroke="white" />
          </svg>
          <svg height="100%" className="row-[5_/_6] col-[3_/_4] self-end justify-self-end" viewBox="0 0 171 171" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className="svgpath" x="1.22681" y="0.785156" width="168.931" height="168.936" stroke="white" />
            <path className="svgpath" d="M169.444 0.537109L0.620361 170.221" stroke="white" />
            <circle className="svgpath" cx="119.146" cy="119.923" r="49.7983" stroke="white" />
          </svg>
          <svg height="100%" className="row-[2_/_3] col-[4_/_5] self-end justify-self-end" viewBox="0 0 388 406" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className="svgpath" x="1.35107" y="1.47266" width="385.593" height="403.428" stroke="white" />
            <circle className="svgpath" cx="59.3481" cy="259.706" r="57.9971" stroke="white" />
            <circle className="svgpath" cx="132.361" cy="110.177" r="108.704" stroke="white" />
            <path className="svgpath" d="M387.444 0.972656L0.851074 405.221" stroke="white" />
          </svg>
          <svg height="100%" className="row-[4_/_5] col-[2_/_3] self-end justify-self-end" viewBox="0 0 292 292" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="svgpath" cx="86.0391" cy="85.5459" r="84.3213" stroke="white" />
            <circle className="svgpath" cx="199.004" cy="38.5889" r="37.3643" stroke="white" />
            <path className="svgpath" d="M290.444 0.472656L1.21777 291.172" stroke="white" />
            <rect className="svgpath" x="1.71777" y="1.22461" width="289.44" height="289.447" stroke="white" />
          </svg>
          <svg width="100%" className="row-[5_/_6] col-[5_/_6] " viewBox="0 0 173 174" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="svgpath" cx="121.916" cy="51.4336" r="49.9336" stroke="white" />
            <rect className="svgpath" x="1" y="1" width="171" height="171" stroke="white" />
            <path className="svgpath" d="M171.5 172L1 1" stroke="white" />
          </svg>
          <p id="subtitle" className={`${styles.subTitle} row-[2_/_3] col-[3_/_5]  text-white font-thin leading-none -translate-y-8 text-[10rem] z-10 self-end select-none`}>Typography</p>
          <p id="title" className={`${styles.title} absolute  text-white font-bold leading-none text-[10rem] select-none`}>版式文法</p>
          <p id="titlec" className={`${styles.titlec} row-[2_/_3] col-[2_/_3] justify-self-end text-white font-bold leading-none text-[10rem] select-none`}>“</p>
          <p id="titlec2" className={`${styles.titlec} row-[3_/_4] col-[5_/_6] justify-self-start text-white font-bold leading-none text-[10rem] select-none`}>”</p>

          <div id="descCard" className={`${styles.desc} row-[4_/_5] col-[4_/_5]  text-white font-medium text-[36px] bg-[#A7724A] flex justify-center flex-col`}>
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
