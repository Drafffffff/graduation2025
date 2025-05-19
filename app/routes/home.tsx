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
gsap.registerPlugin(Flip);

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
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

    const onCotClick = contextSafe(() => {
      if (!clickable) return
      gsap.effects.fade("#col");
      gsap.effects.fade("#lay");
      gsap.effects.fade("#vec");
      const state = Flip.getState(cotEle, { props: "backgroundColor" });
      const placeholder = createPlaceholder(cotEle);
      gsap.set(cotEle, {
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "#666",
        zIndex: 100,
      });
      gsap.set("#cotp", { fontSize: "4.5rem" });
      gsap.to("#cotp", {
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
          nav("/cot");
        }
      });
    });

    const onColClick = contextSafe(() => {
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
        backgroundColor: "#666",
        zIndex: 100,
      });

      gsap.set("#colp", { fontSize: "4.5rem" });
      gsap.to("#colp", {
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
          nav("/col");
        }
      });
    });
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
        backgroundColor: "#666",
        left: 0,
        top: 0,
        zIndex: 100,
      });

      gsap.set("#layp", { fontSize: "4.5rem" });
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
    const onVecClick = contextSafe(() => {
      gsap.effects.fade("#col");
      gsap.effects.fade("#lay");
      gsap.effects.fade("#cot");

      const state = Flip.getState(vecEle, { props: "backgroundColor" });
      const placeholder = createPlaceholder(vecEle);

      gsap.set(vecEle, {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#666",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 100,
      });

      gsap.set("#vecp", { fontSize: "4.5rem" });
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
    cotEle.addEventListener('click', onCotClick);
    vecEle.addEventListener('click', onVecClick);
    colEle.addEventListener('click', onColClick);
    layEle.addEventListener('click', onLayClick);
    return () => {
      cotEle.removeEventListener('click', onCotClick);
      vecEle.removeEventListener('click', onVecClick);
      colEle.removeEventListener('click', onColClick);
      layEle.removeEventListener('click', onLayClick);
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

  return <div className="overflow-hidden">

    <div className="absolute w-screen h-screen flex justify-center items-center z-0 opacity-30">
      <Swiper
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
        <div className={`${styles.hLine1} w-screen h-[1px] bg-black`}></div>
        <div className={`${styles.hLine2} w-screen h-[1px] bg-black`}></div>
        <div className={`${styles.hLine3} w-screen h-[1px] bg-black`}></div>
        <div className={`${styles.hLine4} w-screen h-[1px] bg-black`}></div>
      </div>
      <div className={`${styles.vLine} absolute w-screen h-screen`}>
        <div className={`${styles.vLine1} w-[1px] h-screen bg-black`}></div>
        <div className={`${styles.vLine2} w-[1px] h-screen bg-black`}></div>
        <div className={`${styles.vLine3} w-[1px] h-screen bg-black`}></div>
        <div className={`${styles.vLine4} w-[1px] h-screen bg-black`}></div>
        <div className={`${styles.vLine5} w-[1px] h-screen bg-black`}></div>
      </div>
    </div>
    <div ref={gsapContainer} className={`relative overflow-hidden main-container w-screen h-screen grid grid-cols-[28px_2.5fr_1fr_7fr_1fr_28px] grid-rows-[28px_2.5fr_1fr_2.5fr_28px] z-20`} >
      <div className="row-[2_/_3] col-[2_/_3]">
        <img src="/home/logo.png" />
      </div>
      <div
        ref={cotGSAPRef}
        id="cot" className={`${styles.cot}  bg-[#3CD6A3] flex flex-col justify-between cursor-pointer select-none w-[360px] h-[230px]`} >
        <p id="cotp" className=" font-thin text-8 self-start ">Chain of Thought</p>
        <p id="cotp" className=" font-thin text-8xl  ">思维链</p>
        <img src="/home/cot.png" className="absolute translate-x-6 translate-y-16 " />
      </div>
      <div id="vec" ref={vecGSAPRef} className={`${styles.vec} bg-[#47A8E9]  flex flex-col justify-between  cursor-pointer select-none w-[360px] h-[230px]`}>
        <p id="vecp" className=" font-thin text-8 self-start ">Semantic Embedding</p>
        <p id="vecp" className=" font-thin text-7xl ">语义向量</p>
        <img src="/home/vec.png" className="absolute translate-x-[274px]  " />
      </div>
      <div id="col" ref={colGSAPRef} className={`${styles.col} bg-[#F7A1DB] flex flex-col justify-between cursor-pointer select-none w-[360px] h-[230px]`}>
        <p id="colp" className=" font-thin text-8 self-start ">Color  Algorithm</p>
        <p id="colp" className=" font-thin text-7xl ">配色算法</p>
        <img src="/home/color.png" className="absolute translate-x-[254px]  " />
      </div>
      <div id="lay" ref={layGSAPRef} className={`${styles.lay} bg-[#FFA268] col-span-2 flex flex-col justify-between cursor-pointer select-none w-[360px] h-[230px]`}>
        <p id="layp" className=" font-thin text-8 self-start border-[0.5px]">Flex Layout</p>
        <p id="layp" className=" font-thin text-7xl self-start border-[0.5px] ">版式文法</p>
        <img src="/home/lay1.png" className="absolute translate-x-[225px]  " />
        <img src="/home/lay2.png" className="absolute translate-y-[44px]  " />
      </div>
      <div className="row-[3_/_4] col-[4_/_5]">
        <p className={`${styles.title} bg-[#E7FE79] inline-block`}>AI时代的顶级电商设计师</p>
        <br />
        <p className={`${styles.subtitle} bg-[#E7FE79] inline-block`}>Top Ecommerce Designer in the Age of AI</p>
      </div>
    </div>
  </div >;
}
