import type { Route } from "./+types/home";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import styles from "../style/cot.module.css";
import { useRef } from "react";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "思维链" },
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
  }, { scope: gsapContainer });
  return <>
    <div id="smooth-wrapper" className={styles.main} ref={gsapContainer}>
      <div id="smooth-content" >

        <div className="w-[100vw] h-[100vh] bg-[#000] flex items-start justify-start select-none  ">

          <img src="/cot/landpage.png" className="absolute right-[28px] top-[20px] h-[90vh] select-none" />
          <div className={`absolute w-screen h-screen pointer-events-none z-10`}>
            <div className={`${styles.hLine} absolute w-screen h-screen`}>
              <div className={`${styles.hLine1} w-screen h-[1px] bg-white`}></div>
              <div className={`${styles.hLine2} w-screen h-[1px] bg-white`}></div>
              <div className={`${styles.hLine3} w-screen h-[1px] bg-white`}></div>
              <div className={`${styles.hLine4} w-screen h-[1px] bg-white`}></div>
            </div>
            <div className={`${styles.vLine} absolute w-screen h-screen`}>
              <div className={`${styles.vLine1} w-[1px] h-screen bg-white`}></div>
              <div className={`${styles.vLine2} w-[1px] h-screen bg-white`}></div>
              <div className={`${styles.vLine3} w-[1px] h-screen bg-white`}></div>
              <div className={`${styles.vLine4} w-[1px] h-screen bg-white`}></div>
              <div className={`${styles.vLine5} w-[1px] h-screen bg-white`}></div>
            </div>
          </div>
          <p className={`${styles.subTitle} text-white font-thin leading-none text-[10rem] select-none`}>Chain of Thought</p>
          <p className={`${styles.title} text-white font-bold leading-none text-[10rem] select-none`}>思维链</p>
          <div className={`${styles.desc}  text-white font-medium text-[36px] bg-[#10503C] flex justify-center flex-col`}>
            <p>“</p>
            <p className="text-center">一步一步地思考问题。</p>
            <p className="text-right">”</p>
          </div>

        </div>

        <div className="w-[100vw] h-[100vh] bg-[#fff] flex justify-center items-center  ">

        </div>
      </div>

    </div>
  </>;
}
