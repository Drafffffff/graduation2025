import { Link, useNavigate } from "react-router";
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "../style/home.module.css"
import 'swiper/css';
import type { Route } from "./+types/home";
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { Autoplay } from 'swiper/modules';
import { useRef, useState } from "react";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(Flip, DrawSVGPlugin, SplitText);

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "PicCopilot" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const gsapContainer = useRef<HTMLDivElement>(null)
  const cotGSAPRef = useRef<HTMLDivElement>(null)
  const colGSAPRef = useRef<HTMLDivElement>(null)
  const vecGSAPRef = useRef<HTMLDivElement>(null)
  const layGSAPRef = useRef<HTMLDivElement>(null)
  const [clickable, setClickable] = useState(true)
  const nav = useNavigate()

  useGSAP((context, contextSafe) => {
    const cotEle = cotGSAPRef.current
    const vecEle = vecGSAPRef.current
    const colEle = colGSAPRef.current
    const layEle = layGSAPRef.current
    if (!cotEle || !contextSafe || !vecEle || !colEle || !layEle) return
    gsap.registerEffect({
      name: "fade",
      effect: (targets: any, config: any) => {
        return gsap.to(targets, { duration: config.duration, opacity: 0, ease: "power4.inOut" });
      },
      defaults: { duration: 0.2 }, //defaults get applied to any "config" object passed to the effect
      extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
    });


    //进入动画

    //渐出
    gsap.from("#swiper", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#logo", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })

    const split = SplitText.create("#title", { type: " chars" });
    gsap.from(split.chars, {
      duration: 1,
      opacity: 0,
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.05, // 0.05 seconds between each
      delay: 0.5
    });

    const splitsub = SplitText.create("#subTitle", { type: "words ,chars" });
    gsap.from(splitsub.words, {
      duration: 1,
      opacity: 0,
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.05, // 0.05 seconds between each

      delay: 0.5
    });

    const splitdesc = SplitText.create("#desc", { type: "words,chars" });
    gsap.from(splitdesc.words, {
      duration: 1,
      opacity: 0,
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.05, // 0.05 seconds between each
      delay: 0.5
    });


    gsap.from(SplitText.create("#try", { type: "words ,chars" }).chars, {
      duration: 0.5,
      y: 100,
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.05, // 0.05 seconds between each
      delay: 0.5

    });

    gsap.from("#cot", { x: -400, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#vec", { y: -400, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#col", { y: 400, duration: 1, ease: "power4.inOut", delay: 0.5 })
    gsap.from("#lay", { x: 400, duration: 1, ease: "power4.inOut", delay: 0.5 })

    gsap.from("#hLine1", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.1 })
    gsap.from("#hLine2", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.2 })
    gsap.from("#hLine3", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.4 })
    gsap.from("#hLine4", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.1 })


    gsap.from("#vLine1", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.4 })
    gsap.from("#vLine2", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.3 })
    gsap.from("#vLine3", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.1 })
    gsap.from("#vLine4", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.2 })
    gsap.from("#vLine5", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.5 })

    const onCotClick = contextSafe(() => {
      if (!clickable) return
      setClickable(false)
      gsap.effects.fade("#col"); gsap.effects.fade("#lay");
      gsap.effects.fade("#vec");
      const state = Flip.getState(cotEle, { props: "backgroundColor," });
      const placeholder = createPlaceholder(cotEle);
      gsap.set(cotEle, {
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "#000",
        zIndex: 100,
      });
      gsap.to("#cotp", {
        // fontSize: "10rem",
        duration: 1,
        x: "320px",
        ease: "power4.inOut"
      });
      Flip.from(state, {
        duration: 1,
        ease: "power4.inOut",
        absolute: true,
        onComplete: () => {
          placeholder.remove();
          nav("/cot");
        }
      });
    });

    const onCotHover = contextSafe(() => {
      gsap.fromTo('#cotPath', { duration: 1, drawSVG: 0, ease: "power4.inOut" }, { duration: 1, drawSVG: "100%" })
    })

    const onColClick = contextSafe(() => {
      if (!clickable) return
      setClickable(false)
      gsap.effects.fade("#cot");
      gsap.effects.fade("#lay");
      gsap.effects.fade("#vec");
      const state = Flip.getState(colEle, { props: "backgroundColor" });
      const placeholder = createPlaceholder(colEle);
      gsap.set(colEle, {
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "#000",
        zIndex: 100,
      });

      gsap.to("#colp", {
        duration: 1,
        x: "320px",
        ease: "power4.inOut"
      });

      Flip.from(state, {
        duration: 1,
        ease: "power4.inOut",
        absolute: true,
        onComplete: () => {
          placeholder.remove();
          nav("/col");
        }
      });
    });



    const onColHover = contextSafe(() => {
      const t = 0.6
      const tl1 = gsap.timeline();
      const tl2 = gsap.timeline();
      tl1.to('#colSvg1', { x: 306, duration: t, ease: "power4.inOut" })
      tl2.to('#colSvg2', { x: 254, duration: t, ease: "power4.inOut", })
    })

    const onColLeave = contextSafe(() => {
      const t = 0.6
      const tl1 = gsap.timeline();
      const tl2 = gsap.timeline();
      tl1.to('#colSvg1', { x: 254, duration: t, ease: "power4.inOut" })
      tl2.to('#colSvg2', { x: 307, duration: t, ease: "power4.inOut", })
    })
    const onLayClick = contextSafe(() => {
      gsap.effects.fade("#cot");
      gsap.effects.fade("#col");
      gsap.effects.fade("#vec");

      const state = Flip.getState(layEle, { props: "backgroundColor" });
      const placeholder = createPlaceholder(layEle);

      gsap.set(layEle, {
        width: "100vw",
        height: "100vh",
        position: "absolute",
        backgroundColor: "#000",
        left: 0,
        top: 0,
        zIndex: 100,
      });

      gsap.to("#layp", {
        fontSize: "10rem",
        duration: 1,
        x: "320px",
        ease: "power4.inOut"
      });

      Flip.from(state, {
        duration: 1,
        ease: "power4.inOut",
        absolute: true,
        onComplete: () => {
          placeholder.remove();
          nav("/lay");
        }
      });
    });

    const onLayHover = contextSafe(() => {
      gsap.to('#laysvg1', { x: 0, duration: 1, ease: "power4.inOut" })
      gsap.to('#laysvg2', { y: 82, scaleY: 0.26, ease: "power4.inOut" })
      gsap.to('#layp1', { y: 118, x: 40, ease: "power4.inOut" })
      gsap.to('#layp2', { x: 71, ease: "power4.inOut" })
    })

    const onLayLeave = contextSafe(() => {
      gsap.to('#laysvg1', { x: 225, duration: 0.5, ease: "power4.inOut" })
      gsap.to('#laysvg2', { y: 44, scaleY: 1, duration: 1, ease: "power4.inOut" })
      gsap.to('#layp1', { y: 0, x: 0, duration: 1, ease: "power4.inOut" })
      gsap.to('#layp2', { x: 0, ease: "power4.inOut" })
    })

    const onVecClick = contextSafe(() => {
      if (!clickable) return
      setClickable(false)
      gsap.effects.fade("#col");
      gsap.effects.fade("#lay");
      gsap.effects.fade("#cot");

      const state = Flip.getState(vecEle, { props: "backgroundColor" });
      const placeholder = createPlaceholder(vecEle);

      gsap.set(vecEle, {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 100,
      });

      gsap.to("#vecp", {
        fontSize: "10rem",
        duration: 1,
        x: "320px",
        ease: "power4.inOut"
      });

      Flip.from(state, {
        duration: 1,
        ease: "power4.inOut",
        absolute: true,
        onComplete: () => {
          placeholder.remove();
          nav("/vec");
        }
      });
    });

    const onVecHover = contextSafe(() => {
      gsap.timeline().fromTo('#vecP1', { drawSVG: "100% 100%", ease: "power4.inOut" }, { duration: 0.5, delay: 0.1, drawSVG: "0% 100% ", })
        .fromTo("#vecP4", { drawSVG: "0%", ease: "power4.inOut" }, { duration: 0.3, drawSVG: "100%", })
      gsap.timeline().fromTo('#vecP2', { drawSVG: "0%", ease: "power4.inOut" }, { duration: 0.5, delay: 0.05, drawSVG: "100%", })
        .fromTo("#vecP5", { drawSVG: "0%", ease: "power4.inOut" }, { duration: 0.3, drawSVG: "100%", })
      gsap.timeline().fromTo('#vecP3', { drawSVG: "0", ease: "power4.inOut" }, { duration: 0.5, drawSVG: " 100% ", })
      // .fromTo("#vecP6", { drawSVG: "0%", ease: "power4.inOut" }, { duration: 0.3, drawSVG: "100%", })
    })

    cotEle.addEventListener('click', onCotClick);
    cotEle.addEventListener('mouseenter', onCotHover);
    vecEle.addEventListener('click', onVecClick);
    vecEle.addEventListener('mouseenter', onVecHover);
    colEle.addEventListener('click', onColClick);
    colEle.addEventListener('mouseenter', onColHover);
    colEle.addEventListener('mouseleave', onColLeave);
    layEle.addEventListener('click', onLayClick);
    layEle.addEventListener('mouseenter', onLayHover);
    layEle.addEventListener('mouseleave', onLayLeave);

    return () => {
      cotEle.removeEventListener('click', onCotClick);
      cotEle.removeEventListener('mouseenter', onCotHover);
      vecEle.removeEventListener('click', onVecClick);
      vecEle.removeEventListener('mouseenter', onVecClick);
      colEle.removeEventListener('click', onColClick);
      colEle.removeEventListener('mouseenter', onColHover);
      colEle.removeEventListener('mouseleave', onColLeave);
      layEle.removeEventListener('click', onLayClick);
      layEle.removeEventListener('mouseenter', onLayHover);
      layEle.removeEventListener('mouseleave', onLayLeave);
    };
  }, { scope: gsapContainer });

  function createPlaceholder(element: any) {
    const clone = element.cloneNode(true);
    clone.removeAttribute('id');
    clone.style.visibility = 'hidden';
    clone.style.position = 'static'; // 保持在文档流中
    clone.style.pointerEvents = 'none'; // 防止交互干扰
    element.parentNode.insertBefore(clone, element.nextSibling);
    return clone;
  }

  return <div className="overflow-hidden" ref={gsapContainer}>

    <div className="absolute w-screen h-screen flex justify-center items-center z-0 opacity-30">
      <Swiper
        id="swiper"
        spaceBetween={50}
        slidesPerView={6}
        // onSlideChange={() => console.log('slide change')}
        loop={true}
        // autoHeight={true}
        autoplay={{
          delay: 0,
          // disableOnInteraction: false,
        }}
        speed={2000}
        freeMode={true}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Autoplay]}
        className="h-[50%] w-full"
      >
        {
          Array.from({ length: 30 }).map((_, index) => {
            const offY = Math.random() * 300
            return (<SwiperSlide >
              <div className={`flex h-full w-full justify-between items-start`}>
                <img src={`/home/swiper/${index + 1}.png`} className="rounded-2xl" style={{
                  transform: `translateY(${offY}px)`,
                }} />
              </div>
            </SwiperSlide>)
          })
        }
      </Swiper></div>
    <div className={`absolute w-screen h-screen pointer-events-none z-10`}>
      <div className={`${styles.hLine} absolute w-screen h-screen`}>
        <div id="hLine1" className={`${styles.hLine1} w-screen h-[1px] bg-black`}></div>
        <div id="hLine2" className={`${styles.hLine2} w-screen h-[1px] bg-black`}></div>
        <div id="hLine3" className={`${styles.hLine3} w-screen h-[1px] bg-black`}></div>
        <div id="hLine4" className={`${styles.hLine4} w-screen h-[1px] bg-black`}></div>
      </div>
      <div className={`${styles.vLine} absolute w-screen h-screen`}>
        <div id="vLine1" className={`${styles.vLine1} w-[1px] h-screen bg-black`}></div>
        <div id="vLine2" className={`${styles.vLine2} w-[1px] h-screen bg-black`}></div>
        <div id="vLine3" className={`${styles.vLine3} w-[1px] h-screen bg-black`}></div>
        <div id="vLine4" className={`${styles.vLine4} w-[1px] h-screen bg-black`}></div>
        <div id="vLine5" className={`${styles.vLine5} w-[1px] h-screen bg-black`}></div>
      </div>
    </div>
    <div className={`relative overflow-hidden main-container w-screen h-screen grid grid-cols-[28px_2.5fr_1fr_7fr_1fr_28px] grid-rows-[28px_2.5fr_1fr_2.5fr_28px] z-20`} >
      <div id="logo" className="row-[2_/_3] col-[2_/_3]">
        <img src="/home/logo.png" />
      </div>
      <div
        ref={cotGSAPRef}
        id="cot" className={`${styles.cot} group  bg-[#3CD6A3] flex hover:bg-[#000]  flex-col justify-between cursor-pointer select-none w-[360px] h-[230px]`} >
        <p id="cotp" className=" font-thin text-8 self-start group-hover:invert duration-50 ease-in-out">Chain of Thought</p>
        <p id="cotp" className=" font-thin text-8xl group-hover:invert duration-50 ease-in-out  ">思维链</p>
        <svg width="278" height="145" viewBox="0 0 278 145" fill="none" xmlns="http://www.w3.org/2000/svg" className="cotSVG absolute translate-x-6 translate-y-16 group-hover:invert duration-50 ease-in-out ">
          <path id="cotPath" d="M1.04557 78.8975C2.54225 55.0923 16.5698 -2.60804 61.2758 1.23771C118.657 6.17384 93.9234 144.706 142.349 143.874C203.121 142.83 265.793 -38.9133 277.225 26.2368" stroke="black" strokeWidth="0.862676" />
        </svg>
      </div>
      <div id="vec" ref={vecGSAPRef} className={`${styles.vec} group hover:bg-[#000] bg-[#47A8E9]  flex flex-col justify-between  cursor-pointer select-none w-[360px] h-[230px]`}>
        <p id="vecp" className=" font-thin text-8 self-start group-hover:invert duration-50 ease-in-out ">Semantic Embedding</p>
        <p id="vecp" className=" font-thin text-7xl group-hover:invert duration-50 ease-in-out">语义向量</p>
        <svg width="85" className="absolute translate-x-[274px] group-hover:invert duration-50 ease-in-out " height="81" viewBox="0 0 85 81" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="vecP1" d="M82.7953 1.8125L3.6333 78.8692" stroke="black" strokeWidth="0.842149" />
          <path id="vecP2" d="M0.265137 69.6074H83.6379" stroke="black" strokeWidth="0.842149" />
          <path id="vecP3" d="M12.0552 80.9757L12.0552 1.39258" stroke="black" strokeWidth="0.842149" />
          <path id="vecP4" d="M74.374 2.6558L82.7955 1.39258V9.393" stroke="black" strokeWidth="0.842149" />
          <path id="vecP5" d="M76.4795 64.1327L83.6378 69.6067L76.4795 75.9228M5.31787 8.97192L12.0551 1.39258L17.9501 8.97192" stroke="black" strokeWidth="0.842149" />
        </svg>
      </div>
      <div id="col" ref={colGSAPRef} className={`${styles.col} bg-[#F7A1DB] group hover:bg-[#000] flex flex-col justify-between cursor-pointer select-none w-[360px] h-[230px]`}>
        <p id="colp" className=" font-thin text-8 self-start group-hover:invert duration-50 ease-in-out">Color  Algorithm</p>
        <p id="colp" className=" font-thin text-7xl group-hover:invert duration-50 ease-in-out">配色算法</p>
        <svg id="colSvg1" className="absolute translate-x-[254px]  translate-y-[53px]" width="54" height="53" viewBox="0 0 54 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.907715" y="0.449219" width="52.4485" height="52.4485" className="fill-[#AD5555]  group-hover:fill-none group-hover:stroke-white" />
          <circle cx="27.132" cy="26.6735" r="26.2243" className="fill-[#FF7070]  group-hover:fill-none group-hover:stroke-white" />
        </svg>
        <svg id="colSvg2" className="absolute translate-x-[306px]  " width="54" height="53" viewBox="0 0 54 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.907715" y="0.449219" width="52.4485" height="52.4485" className="fill-[#AD5555]  group-hover:fill-none group-hover:stroke-white" />
          <circle cx="27.132" cy="26.6735" r="26.2243" className="fill-[#FF7070]  group-hover:fill-none group-hover:stroke-white" />
        </svg>
      </div>
      <div id="lay" ref={layGSAPRef} className={`${styles.lay} group bg-[#FFA268] hover:bg-[#000] col-span-2 flex flex-col justify-between cursor-pointer select-none w-[360px] h-[230px]`}>
        <p id="layp1" className=" font-thin text-8 self-start border-[0.5px] group-hover:invert duration-50 ease-in-out">Flex Layout</p>
        <p id="layp2" className=" font-thin text-7xl self-start border-[0.5px] group-hover:invert duration-50 ease-in-out ">版式文法</p>
        <svg id="laysvg1" width="136" height="97" className="absolute translate-x-[225px] group-hover:invert duration-50  ease-in-out" viewBox="0 0 136 97" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.523416" y="0.604471" width="134.428" height="95.5849" stroke="black" strokeWidth="0.380816" />
          <path d="M0.535529 96.155L134.964 0.569708" stroke="black" strokeWidth="0.380816" />
          <path d="M0.536133 0.572266L134.964 96.1572" stroke="black" strokeWidth="0.380816" />
        </svg>
        <svg id="laysvg2" width="30" className="absolute translate-y-[44px]  group-hover:invert duration-50 ease-in-out" height="97" viewBox="0 0 30 97" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.452127" y="0.370096" width="29.3229" height="95.5849" stroke="black" strokeWidth="0.380816" />
          <path d="M0.529856 95.7312L29.6973 0.5959" stroke="black" strokeWidth="0.380816" />
          <path d="M29.4718 95.7997L0.755371 0.527344" stroke="black" strokeWidth="0.380816" />
        </svg>
      </div>
      <div className="row-[3_/_4] col-[4_/_5]">
        <p id="title" className={`${styles.title} bg-[#E7FE79] inline-block`}>AI时代的顶级电商设计师</p>
        <br />
        <p id="subTitle" className={`${styles.subtitle} bg-[#E7FE79] inline-block`}>Top Ecommerce Designer in the Age of AI</p>
      </div>
      <div id="desc" className="select-none row-[2_/_3] col-[4_/_5] text-[24px] font-thin w-[35%]"><p>Create pictures that sell your products with Pic Copilot Al.Proven to boost click-through rates by 54.7%!</p></div>
      <div id="try" className="select-none row-[4_/_5] col-[4_/_5] text-[48px] font-normal underline  self-end justify-self-end "><p>访问piccopilot.com即刻体验</p></div>
    </div>
  </div >;
}
