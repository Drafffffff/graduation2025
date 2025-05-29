
import { Link, useNavigate } from "react-router";
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
export default function Back() {
  const gsapContainer = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useGSAP((context, contextSafe) => {
    const butEl = buttonRef.current

    if (!butEl || !contextSafe) return
    const onButClick = contextSafe(() => {
      gsap.to("#backbg", {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          nav("/")
        }
      })

      gsap.to("#backButton", {
        opacity: 0,
        duration: 0.2
      })

      // gsap.to('#laysvg2', { y: 44, scaleY: 1, duration: 1, ease: "power4.inOut" })
      // gsap.to('#layp1', { y: 0, x: 0, duration: 1, ease: "power4.inOut" })
      // gsap.to('#layp2', { x: 0, ease: "power4.inOut" })
    })

    butEl.addEventListener('click', onButClick);
    return () => {
      butEl.removeEventListener('click', onButClick);
    }
  }, { scope: gsapContainer })

  const nav = useNavigate()
  return <div ref={gsapContainer}>
    <div id="backbg" className="w-screen h-screen bg-[#202020] fixed pointer-events-none "
      style={{
        opacity: 0
      }}
    >
    </div>

    <div id="backButton" className="select-none w-[5rem] h-[5rem] bg-white border fixed top-[50%] flex justify-center items-center cursor-pointer"
      ref={buttonRef}
    >
      <img src="back.svg" />
    </div>
  </div>
}
