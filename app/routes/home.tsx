import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/home";
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
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
  const cmfGSAPRef = useRef<HTMLDivElement>(null)
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
    const cmfEle = cmfGSAPRef.current
    if (!cotEle || !contextSafe || !vecEle || !colEle || !layEle || !cmfEle) return
    gsap.registerEffect({
      name: "fade",
      effect: (targets: any, config: any) => {
        return gsap.to(targets, { duration: config.duration, opacity: 0, ease: "power4.inOut" });
      },
      defaults: { duration: 0.2 }, //defaults get applied to any "config" object passed to the effect
      extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
    });

    //初始动画
    gsap.from("#cot", {
      x: "-100%",
      duration: 1,
      ease: "power4.out",
      delay: 0,
    })

    gsap.from("#cmf", {
      y: "-100%",
      duration: 1,
      ease: "power4.out",
      delay: 0.1,
    })

    gsap.from("#vec", {
      y: "100%",
      duration: 1,
      ease: "power4.out",
      delay: 0.2,
    })

    gsap.from("#lay", {
      x: "100%",
      duration: 1,
      ease: "power4.out",
      delay: 0.3
    })

    gsap.from("#col", {
      scale: 0,
      duration: 1,
      ease: "power4.out",

      delay: 0.4
    })

    const onCotClick = contextSafe(() => {
      if (!clickable) return
      gsap.effects.fade("#cmf");
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

      if (!clickable) return
      gsap.effects.fade("#cmf");
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
      gsap.effects.fade("#cmf");
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
      gsap.effects.fade("#cmf");
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
    const onCmfClick = contextSafe(() => {
      gsap.effects.fade("#cot");
      gsap.effects.fade("#col");
      gsap.effects.fade("#lay");
      gsap.effects.fade("#vec");
      const state = Flip.getState(cmfEle, { props: "backgroundColor" })
      createPlaceholder(cmfEle)
      gsap.set(cmfEle, {
        width: "100vw",
        height: "100vh",
        position: "absolute",
        backgroundColor: "#666",
        left: 0,
        top: 0,
      })
      gsap.set("#cmfp", {
        fontSize: "60px",
      })
      gsap.to("#cmfp", {
        fontSize: "10rem",
        duration: 1,
        x: "320px",
        ease: "power4.inOut",
      })
      Flip.from(state, {
        duration: 1,
        ease: "power4.inOut",
        absolute: true,
        onComplete: () => {
          nav("/cmf")

        }
      })



    });
    cotEle.addEventListener('click', onCotClick);
    cmfEle.addEventListener('click', onCmfClick);
    vecEle.addEventListener('click', onVecClick);
    colEle.addEventListener('click', onColClick);
    layEle.addEventListener('click', onLayClick);
    return () => {
      cotEle.removeEventListener('click', onCotClick);
      cmfEle.removeEventListener('click', onCmfClick);
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

  return <div ref={gsapContainer} className="overflow-hidden main-container bg-white  w-screen h-screen grid grid-cols-[3fr_5fr_3fr] gap-2  grid-rows-3   ">
    <div
      ref={cotGSAPRef}
      id="cot" className="bg-[#FF8C19] col-span-2 flex justify-center items-center cursor-pointer select-none" >
      <p id="cotp" className="text-white font-bold text-7xl ">COT</p>
    </div>
    <div id="cmf" ref={cmfGSAPRef} className="bg-[#AA4779] col-span-1 row-span-2 flex justify-center items-center">
      <p id="cmfp" className="text-white font-bold text-6xl ">CMF</p>
    </div>
    <div id="vec" ref={vecGSAPRef} className="bg-[#77E0F3] row-span-2 flex justify-center items-center">
      <p id="vecp" className="text-white font-bold text-7xl ">Vector</p>
    </div>
    <div id="col" ref={colGSAPRef} className="bg-[#FBD14B] flex justify-center items-center">
      <p id="colp" className="text-white font-bold text-7xl ">Colors</p>
    </div>
    <div id="lay" ref={layGSAPRef} className="bg-[#B4DC19] col-span-2 flex justify-center items-center">
      <p id="layp" className="text-white font-bold text-7xl ">Layout</p>
    </div>
  </div>;
}
