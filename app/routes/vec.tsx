
import type { Route } from "./+types/home";
import styles from "../style/vec.module.css";
import { useEffect, useRef, useState } from "react";
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
  const [imgData, setImgData] = useState<string[]>([])
  const [curImgIndex, setCurImgIndex] = useState<number>(0)
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
    gsap.from("#descCard", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1 })
    gsap.from("#descp1", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1.1 })
    gsap.from("#descp2", { opacity: 0, duration: 1, ease: "power4.inOut", delay: 1.4 })
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

  useEffect(() => {
    async function getData() {
      fetch('/vec/imgData.json')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setImgData(data)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
    getData()
  }, [0])

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

        <div className="h-[20rem] w-screen bg-white">
          <div className={`${styles.vLine} absolute w-screen h-full`}>
            <div id="vLine1" className={`${styles.vLine1} w-[1px] h-screen bg-black`}></div>
            <div id="vLine2" className={`${styles.vLine2} w-[1px] h-screen bg-black`}></div>
            <div id="vLine3" className={`${styles.vLine3} w-[1px] h-screen bg-black`}></div>
            <div id="vLine4" className={`${styles.vLine4} w-[1px] h-screen bg-black`}></div>
            <div id="vLine5" className={`${styles.vLine5} w-[1px] h-screen bg-black`}></div>
            <div id="vLine6" className={`${styles.vLine6} w-[1px] h-screen bg-black`}></div>
            <div id="vLine7" className={`${styles.vLine7} w-[1px] h-screen bg-black`}></div>
          </div>
        </div>
        <div className="w-[100vw]  bg-[#fff] flex justify-start flex-col items-start  ">
          <div className={`${styles.hLine} absolute w-screen h-screen`}>
            <div id="hLine1" className={` w-screen h-[1px] bg-black translate-y-[calc(8rem-3px)]`}></div>
            <div id="hLine2" className={` w-screen h-[1px] bg-black translate-y-[calc(8rem-3px+818px)]`}></div>
          </div>

          <div className={`${styles.vLine} absolute w-screen h-screen`}>
            <div id="vLine1" className={`${styles.vLine1} w-[1px] h-screen bg-black`}></div>
            <div id="vLine2" className={`${styles.vLine2} w-[1px] h-screen bg-black`}></div>
            <div id="vLine3" className={`${styles.vLine3} w-[1px] h-screen bg-black`}></div>
            <div id="vLine4" className={`${styles.vLine4} w-[1px] h-screen bg-black`}></div>
            <div id="vLine5" className={`${styles.vLine5} w-[1px] h-screen bg-black`}></div>
            <div id="vLine6" className={`${styles.vLine6} w-[1px] h-screen bg-black`}></div>
            <div id="vLine7" className={`${styles.vLine7} w-[1px] h-screen bg-black`}></div>
          </div>

          <div className="flex flex-row w-full justify-between">
            <div className="px-[28px] ">
              <p className="row-[2_/_3] col-[2_/_3] text-[5rem] leading-none font-thin">
                嵌入
              </p>
              <p className=" text-[2.8rem] leading-none text-gray-400 font-normal ">
                Embedding
              </p>
            </div>
            <p className="mr-[28px] font-thin text-[2rem] self-end">
              将语义数学化，
              然后交给机器。
            </p>
          </div>
          <div className="flex flex-row pl-[calc(28px+33.3333vh-58px)] mt-[10rem] relative">
            <svg width="829" height="714" viewBox="0 0 829 714" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M220.184 500.836L298.425 214.77" stroke="#A8A8A8" strokeWidth="5" strokeDasharray="10 10" />
              <path d="M253.277 611.161L493.528 432.777" stroke="#A8A8A8" strokeWidth="5" strokeDasharray="10 10" />
              <path d="M59 6.5L59 713.469" stroke="black" strokeWidth="3" />
              <path d="M39.0316 47.0746L59.0174 4.38672L79.0294 47.2217" stroke="black" strokeWidth="3" />
              <path d="M0 660.469H820.5" stroke="black" strokeWidth="3" />
              <path d="M781.994 640.471L824.682 660.457L781.847 680.469" stroke="black" strokeWidth="3" />
              <path d="M493.528 432.406L59.4584 660.352" stroke="#47A8E9" strokeWidth="5" />
              <path d="M460.437 434.393L494.582 431.629L474.754 459.693" stroke="#47A8E9" strokeWidth="5" />
              <circle cx="519.255" cy="427.632" r="5.14557" fill="#47A8E9" />
              <path d="M549.558 444.776C546.614 444.776 544.006 444.04 541.734 442.568C539.494 441.064 537.734 438.936 536.454 436.184C535.174 433.432 534.534 430.184 534.534 426.44C534.534 422.664 535.174 419.432 536.454 416.744C537.734 414.024 539.494 411.944 541.734 410.504C544.006 409.064 546.614 408.344 549.558 408.344C552.502 408.344 555.094 409.08 557.334 410.552C559.606 411.992 561.382 414.056 562.662 416.744C563.942 419.432 564.582 422.664 564.582 426.44C564.582 430.184 563.942 433.432 562.662 436.184C561.382 438.936 559.606 441.064 557.334 442.568C555.094 444.04 552.502 444.776 549.558 444.776ZM549.558 441.08C551.67 441.08 553.51 440.488 555.078 439.304C556.646 438.12 557.862 436.424 558.726 434.216C559.59 432.008 560.022 429.416 560.022 426.44C560.022 423.496 559.59 420.968 558.726 418.856C557.862 416.712 556.646 415.08 555.078 413.96C553.51 412.808 551.67 412.232 549.558 412.232C547.478 412.232 545.638 412.808 544.038 413.96C542.47 415.08 541.254 416.712 540.39 418.856C539.526 420.968 539.094 423.496 539.094 426.44C539.094 429.416 539.526 432.008 540.39 434.216C541.254 436.424 542.47 438.12 544.038 439.304C545.638 440.488 547.478 441.08 549.558 441.08ZM560.31 452.984C558.102 452.984 556.118 452.6 554.358 451.832C552.598 451.064 551.11 449.992 549.894 448.616C548.71 447.272 547.798 445.752 547.158 444.056L551.766 443.672C552.246 444.92 552.918 445.96 553.782 446.792C554.678 447.624 555.718 448.248 556.902 448.664C558.118 449.08 559.414 449.288 560.79 449.288C561.59 449.288 562.294 449.24 562.902 449.144C563.51 449.048 564.038 448.92 564.486 448.76L565.35 452.168C564.838 452.392 564.134 452.584 563.238 452.744C562.342 452.904 561.366 452.984 560.31 452.984ZM579.423 444.776C576.671 444.776 574.639 443.912 573.327 442.184C572.047 440.456 571.407 437.928 571.407 434.6V418.088H575.823V434.072C575.823 436.472 576.207 438.232 576.975 439.352C577.743 440.44 578.991 440.984 580.719 440.984C582.063 440.984 583.263 440.632 584.319 439.928C585.375 439.224 586.527 438.104 587.775 436.568V418.088H592.143V444.152H588.495L588.159 440.072H588.015C586.799 441.48 585.503 442.616 584.127 443.48C582.783 444.344 581.215 444.776 579.423 444.776ZM611.507 444.776C609.171 444.776 607.059 444.232 605.171 443.144C603.283 442.056 601.779 440.504 600.659 438.488C599.571 436.44 599.027 433.992 599.027 431.144C599.027 429 599.347 427.096 599.987 425.432C600.627 423.736 601.491 422.296 602.579 421.112C603.699 419.896 604.963 418.984 606.371 418.376C607.779 417.736 609.219 417.416 610.691 417.416C612.931 417.416 614.819 417.912 616.355 418.904C617.891 419.896 619.059 421.32 619.859 423.176C620.691 425 621.107 427.16 621.107 429.656C621.107 430.136 621.091 430.584 621.059 431C621.027 431.416 620.979 431.8 620.915 432.152H603.347C603.443 434.008 603.859 435.624 604.595 437C605.363 438.344 606.371 439.4 607.619 440.168C608.867 440.904 610.323 441.272 611.987 441.272C613.267 441.272 614.419 441.096 615.443 440.744C616.499 440.36 617.523 439.848 618.515 439.208L620.051 442.136C618.931 442.872 617.667 443.496 616.259 444.008C614.851 444.52 613.267 444.776 611.507 444.776ZM603.299 429.032H617.267C617.267 426.408 616.691 424.408 615.539 423.032C614.419 421.624 612.835 420.92 610.787 420.92C609.571 420.92 608.419 421.24 607.331 421.88C606.275 422.52 605.379 423.432 604.643 424.616C603.939 425.8 603.491 427.272 603.299 429.032ZM638.086 444.776C635.75 444.776 633.638 444.232 631.75 443.144C629.862 442.056 628.358 440.504 627.238 438.488C626.15 436.44 625.606 433.992 625.606 431.144C625.606 429 625.926 427.096 626.566 425.432C627.206 423.736 628.07 422.296 629.158 421.112C630.278 419.896 631.542 418.984 632.95 418.376C634.358 417.736 635.798 417.416 637.27 417.416C639.51 417.416 641.398 417.912 642.934 418.904C644.47 419.896 645.638 421.32 646.438 423.176C647.27 425 647.686 427.16 647.686 429.656C647.686 430.136 647.67 430.584 647.638 431C647.606 431.416 647.558 431.8 647.494 432.152H629.926C630.022 434.008 630.438 435.624 631.174 437C631.942 438.344 632.95 439.4 634.198 440.168C635.446 440.904 636.902 441.272 638.566 441.272C639.846 441.272 640.998 441.096 642.022 440.744C643.078 440.36 644.102 439.848 645.094 439.208L646.63 442.136C645.51 442.872 644.246 443.496 642.838 444.008C641.43 444.52 639.846 444.776 638.086 444.776ZM629.878 429.032H643.846C643.846 426.408 643.27 424.408 642.118 423.032C640.998 421.624 639.414 420.92 637.366 420.92C636.15 420.92 634.998 421.24 633.91 421.88C632.854 422.52 631.958 423.432 631.222 424.616C630.518 425.8 630.07 427.272 629.878 429.032ZM654.104 444.152V418.088H657.704L658.136 421.88H658.232C659.48 420.632 660.792 419.576 662.168 418.712C663.576 417.848 665.176 417.416 666.968 417.416C669.72 417.416 671.736 418.296 673.016 420.056C674.296 421.784 674.936 424.312 674.936 427.64V444.152H670.568V428.216C670.568 425.752 670.168 423.976 669.368 422.888C668.6 421.8 667.352 421.256 665.624 421.256C664.28 421.256 663.08 421.592 662.024 422.264C660.968 422.936 659.8 423.928 658.52 425.24V444.152H654.104Z" fill="#47A8E9" />
              <path d="M216.466 504.383L59 660.468" stroke="#FFA268" strokeWidth="5" />
              <path d="M186.813 513.344L219.287 502.437L206.803 534.451" stroke="#FFA268" strokeWidth="5" />
              <circle cx="231.175" cy="493.04" r="5.14557" fill="#FFA268" />
              <path d="M245.518 502.561V467.377H250.846L257.566 486.193C258.014 487.377 258.446 488.593 258.862 489.841C259.278 491.089 259.694 492.321 260.11 493.537H260.302C260.75 492.321 261.166 491.089 261.55 489.841C261.966 488.593 262.366 487.377 262.75 486.193L269.47 467.377H274.798V502.561H270.67V483.073C270.67 482.049 270.702 480.945 270.766 479.761C270.83 478.545 270.91 477.329 271.006 476.113C271.102 474.865 271.182 473.729 271.246 472.705H271.054L268.222 480.721L261.598 499.009H258.622L251.95 480.721L249.118 472.705H248.926C249.054 473.729 249.15 474.865 249.214 476.113C249.31 477.329 249.374 478.545 249.406 479.761C249.47 480.945 249.502 482.049 249.502 483.073V502.561H245.518ZM290.039 503.185C288.599 503.185 287.303 502.897 286.151 502.321C284.999 501.745 284.087 500.913 283.415 499.825C282.775 498.705 282.455 497.361 282.455 495.793C282.455 492.945 283.719 490.769 286.247 489.265C288.807 487.729 292.871 486.657 298.439 486.049C298.439 484.929 298.279 483.873 297.959 482.881C297.671 481.857 297.143 481.041 296.375 480.433C295.607 479.793 294.503 479.473 293.063 479.473C291.559 479.473 290.135 479.777 288.791 480.385C287.479 480.961 286.295 481.585 285.239 482.257L283.559 479.233C284.359 478.721 285.287 478.209 286.343 477.697C287.399 477.153 288.551 476.705 289.799 476.353C291.047 476.001 292.375 475.825 293.783 475.825C295.895 475.825 297.607 476.273 298.919 477.169C300.263 478.065 301.239 479.313 301.847 480.913C302.487 482.481 302.807 484.353 302.807 486.529V502.561H299.207L298.823 499.441H298.679C297.463 500.465 296.119 501.345 294.647 502.081C293.207 502.817 291.671 503.185 290.039 503.185ZM291.287 499.633C292.535 499.633 293.719 499.345 294.839 498.769C295.991 498.193 297.191 497.345 298.439 496.225V488.977C295.527 489.297 293.207 489.761 291.479 490.369C289.751 490.945 288.519 491.665 287.783 492.529C287.047 493.361 286.679 494.353 286.679 495.505C286.679 497.009 287.127 498.081 288.023 498.721C288.919 499.329 290.007 499.633 291.287 499.633ZM311.086 502.561V476.497H314.686L315.118 480.289H315.214C316.462 479.041 317.774 477.985 319.15 477.121C320.558 476.257 322.158 475.825 323.95 475.825C326.702 475.825 328.718 476.705 329.998 478.465C331.278 480.193 331.918 482.721 331.918 486.049V502.561H327.55V486.625C327.55 484.161 327.15 482.385 326.35 481.297C325.582 480.209 324.334 479.665 322.606 479.665C321.262 479.665 320.062 480.001 319.006 480.673C317.95 481.345 316.782 482.337 315.502 483.649V502.561H311.086Z" fill="#FFA268" />
              <path d="M297.513 215.695L59 660.469" stroke="#F7A1DB" strokeWidth="5" />
              <path d="M270.256 235.897L297.811 215.543L295.762 249.844" stroke="#F7A1DB" strokeWidth="5" />
              <circle cx="308.103" cy="205.245" r="5.14557" fill="#F7A1DB" />
              <path d="M325.446 221.766V186.582H329.862V204.246H329.958L344.694 186.582H349.734L338.694 199.926L351.414 221.766H346.47L335.91 203.43L329.862 210.63V221.766H325.446ZM356.046 221.766V195.702H360.462V221.766H356.046ZM358.254 190.326C357.39 190.326 356.686 190.07 356.142 189.558C355.63 189.014 355.374 188.294 355.374 187.398C355.374 186.534 355.63 185.846 356.142 185.334C356.686 184.822 357.39 184.566 358.254 184.566C359.118 184.566 359.822 184.822 360.366 185.334C360.91 185.846 361.182 186.534 361.182 187.398C361.182 188.294 360.91 189.014 360.366 189.558C359.822 190.07 359.118 190.326 358.254 190.326ZM369.264 221.766V195.702H372.864L373.296 199.494H373.392C374.64 198.246 375.952 197.19 377.328 196.326C378.736 195.462 380.336 195.03 382.128 195.03C384.88 195.03 386.896 195.91 388.176 197.67C389.456 199.398 390.096 201.926 390.096 205.254V221.766H385.728V205.83C385.728 203.366 385.328 201.59 384.528 200.502C383.76 199.414 382.512 198.87 380.784 198.87C379.44 198.87 378.24 199.206 377.184 199.878C376.128 200.55 374.96 201.542 373.68 202.854V221.766H369.264ZM407.345 233.766C405.233 233.766 403.361 233.494 401.729 232.95C400.097 232.406 398.833 231.606 397.937 230.55C397.041 229.526 396.593 228.278 396.593 226.806C396.593 225.686 396.929 224.598 397.601 223.542C398.273 222.518 399.217 221.638 400.433 220.902V220.662C399.761 220.246 399.201 219.686 398.753 218.982C398.305 218.278 398.081 217.414 398.081 216.39C398.081 215.302 398.385 214.342 398.993 213.51C399.633 212.678 400.289 212.022 400.961 211.542V211.35C400.097 210.678 399.313 209.734 398.609 208.518C397.905 207.302 397.553 205.91 397.553 204.342C397.553 202.422 398.001 200.774 398.897 199.398C399.793 197.99 400.977 196.918 402.449 196.182C403.953 195.414 405.569 195.03 407.297 195.03C408.065 195.03 408.753 195.094 409.361 195.222C410.001 195.35 410.545 195.51 410.993 195.702H420.065V199.062H414.737C415.377 199.67 415.889 200.438 416.273 201.366C416.657 202.294 416.849 203.318 416.849 204.438C416.849 206.294 416.417 207.91 415.553 209.286C414.721 210.63 413.585 211.67 412.145 212.406C410.705 213.142 409.089 213.51 407.297 213.51C406.689 213.51 406.033 213.43 405.329 213.27C404.657 213.11 404.033 212.886 403.457 212.598C402.977 212.982 402.577 213.414 402.257 213.894C401.937 214.374 401.777 214.982 401.777 215.718C401.777 216.518 402.097 217.19 402.737 217.734C403.377 218.278 404.577 218.55 406.337 218.55H411.473C414.481 218.55 416.737 219.046 418.241 220.038C419.777 221.03 420.545 222.598 420.545 224.742C420.545 226.342 420.001 227.83 418.913 229.206C417.825 230.582 416.289 231.686 414.305 232.518C412.353 233.35 410.033 233.766 407.345 233.766ZM407.297 210.534C408.321 210.534 409.249 210.278 410.081 209.766C410.945 209.254 411.617 208.534 412.097 207.606C412.609 206.678 412.865 205.59 412.865 204.342C412.865 203.062 412.609 201.974 412.097 201.078C411.617 200.15 410.961 199.446 410.129 198.966C409.297 198.486 408.353 198.246 407.297 198.246C406.305 198.246 405.377 198.486 404.513 198.966C403.681 199.446 403.009 200.134 402.497 201.03C402.017 201.926 401.777 203.03 401.777 204.342C401.777 205.59 402.033 206.678 402.545 207.606C403.057 208.534 403.729 209.254 404.561 209.766C405.393 210.278 406.305 210.534 407.297 210.534ZM407.969 230.742C409.633 230.742 411.073 230.486 412.289 229.974C413.537 229.462 414.497 228.79 415.169 227.958C415.873 227.158 416.225 226.326 416.225 225.462C416.225 224.214 415.777 223.35 414.881 222.87C413.985 222.39 412.673 222.15 410.945 222.15H406.433C405.953 222.15 405.409 222.118 404.801 222.054C404.225 222.022 403.649 221.926 403.073 221.766C402.145 222.406 401.473 223.11 401.057 223.878C400.641 224.678 400.433 225.446 400.433 226.182C400.433 227.558 401.089 228.662 402.401 229.494C403.745 230.326 405.601 230.742 407.969 230.742Z" fill="#F7A1DB" />
              <path d="M252.615 610.264L59 660.468" stroke="#3CD6A3" strokeWidth="5" />
              <path d="M219.066 604.415L252.794 610.409L226.492 632.52" stroke="#3CD6A3" strokeWidth="5" />
              <circle cx="276.493" cy="601.524" r="5.14557" fill="#3CD6A3" />
              <path d="M297.676 618.045L290.236 582.861H294.796L298.492 602.013C298.844 603.901 299.196 605.805 299.548 607.725C299.9 609.613 300.252 611.517 300.604 613.437H300.796C301.212 611.517 301.628 609.613 302.044 607.725C302.46 605.805 302.876 603.901 303.292 602.013L308.14 582.861H312.22L317.116 602.013C317.532 603.901 317.948 605.805 318.364 607.725C318.78 609.613 319.212 611.517 319.66 613.437H319.9C320.22 611.517 320.54 609.613 320.86 607.725C321.18 605.805 321.5 603.901 321.82 602.013L325.612 582.861H329.836L322.588 618.045H317.212L311.884 596.829C311.564 595.421 311.26 594.077 310.972 592.797C310.716 591.485 310.444 590.157 310.156 588.813H309.964C309.708 590.157 309.42 591.485 309.1 592.797C308.78 594.077 308.476 595.421 308.188 596.829L302.956 618.045H297.676ZM345.673 618.669C343.561 618.669 341.577 618.141 339.721 617.085C337.865 615.997 336.377 614.445 335.257 612.429C334.169 610.381 333.625 607.917 333.625 605.037C333.625 602.125 334.169 599.661 335.257 597.645C336.377 595.597 337.865 594.029 339.721 592.941C341.577 591.853 343.561 591.309 345.673 591.309C347.273 591.309 348.793 591.613 350.233 592.221C351.705 592.829 353.001 593.725 354.121 594.909C355.241 596.093 356.121 597.533 356.761 599.229C357.401 600.925 357.721 602.861 357.721 605.037C357.721 607.917 357.161 610.381 356.041 612.429C354.921 614.445 353.449 615.997 351.625 617.085C349.801 618.141 347.817 618.669 345.673 618.669ZM345.673 615.021C347.177 615.021 348.489 614.605 349.609 613.773C350.761 612.941 351.657 611.773 352.297 610.269C352.937 608.765 353.257 607.021 353.257 605.037C353.257 603.021 352.937 601.261 352.297 599.757C351.657 598.253 350.761 597.085 349.609 596.253C348.489 595.421 347.177 595.005 345.673 595.005C344.169 595.005 342.841 595.421 341.689 596.253C340.569 597.085 339.689 598.253 339.049 599.757C338.441 601.261 338.137 603.021 338.137 605.037C338.137 607.021 338.441 608.765 339.049 610.269C339.689 611.773 340.569 612.941 341.689 613.773C342.841 614.605 344.169 615.021 345.673 615.021ZM364.654 618.045V591.981H368.254L368.686 595.773H368.782C369.934 594.525 371.182 593.469 372.526 592.605C373.902 591.741 375.358 591.309 376.894 591.309C378.91 591.309 380.478 591.757 381.598 592.653C382.718 593.549 383.55 594.765 384.094 596.301C385.47 594.829 386.846 593.629 388.222 592.701C389.63 591.773 391.134 591.309 392.734 591.309C395.39 591.309 397.358 592.189 398.638 593.949C399.95 595.677 400.606 598.205 400.606 601.533V618.045H396.238V602.109C396.238 599.645 395.838 597.869 395.038 596.781C394.27 595.693 393.054 595.149 391.39 595.149C390.398 595.149 389.358 595.485 388.27 596.157C387.214 596.797 386.062 597.789 384.814 599.133V618.045H380.446V602.109C380.446 599.645 380.046 597.869 379.246 596.781C378.478 595.693 377.262 595.149 375.598 595.149C374.606 595.149 373.566 595.485 372.478 596.157C371.39 596.797 370.254 597.789 369.07 599.133V618.045H364.654ZM415.092 618.669C413.652 618.669 412.356 618.381 411.204 617.805C410.052 617.229 409.14 616.397 408.468 615.309C407.828 614.189 407.508 612.845 407.508 611.277C407.508 608.429 408.772 606.253 411.3 604.749C413.86 603.213 417.924 602.141 423.492 601.533C423.492 600.413 423.332 599.357 423.012 598.365C422.724 597.341 422.196 596.525 421.428 595.917C420.66 595.277 419.556 594.957 418.116 594.957C416.612 594.957 415.188 595.261 413.844 595.869C412.532 596.445 411.348 597.069 410.292 597.741L408.612 594.717C409.412 594.205 410.34 593.693 411.396 593.181C412.452 592.637 413.604 592.189 414.852 591.837C416.1 591.485 417.428 591.309 418.836 591.309C420.948 591.309 422.66 591.757 423.972 592.653C425.316 593.549 426.292 594.797 426.9 596.397C427.54 597.965 427.86 599.837 427.86 602.013V618.045H424.26L423.876 614.925H423.732C422.516 615.949 421.172 616.829 419.7 617.565C418.26 618.301 416.724 618.669 415.092 618.669ZM416.34 615.117C417.588 615.117 418.772 614.829 419.892 614.253C421.044 613.677 422.244 612.829 423.492 611.709V604.461C420.58 604.781 418.26 605.245 416.532 605.853C414.804 606.429 413.572 607.149 412.836 608.013C412.1 608.845 411.732 609.837 411.732 610.989C411.732 612.493 412.18 613.565 413.076 614.205C413.972 614.813 415.06 615.117 416.34 615.117ZM436.138 618.045V591.981H439.738L440.17 595.773H440.266C441.514 594.525 442.826 593.469 444.202 592.605C445.61 591.741 447.21 591.309 449.002 591.309C451.754 591.309 453.77 592.189 455.05 593.949C456.33 595.677 456.97 598.205 456.97 601.533V618.045H452.602V602.109C452.602 599.645 452.202 597.869 451.402 596.781C450.634 595.693 449.386 595.149 447.658 595.149C446.314 595.149 445.114 595.485 444.058 596.157C443.002 596.829 441.834 597.821 440.554 599.133V618.045H436.138Z" fill="#3CD6A3" />
            </svg>
            <div className="flex flex-col self-end  -translate-y-[60px] ml-[calc(33.3333vh-20px)]">

              <div className="flex flex-row mb-[2rem] justify-between ">
                <p className="text-[3rem] leading-none">
                  King
                </p>
                <svg width="94" height="44" viewBox="0 0 94 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M47.6677 2.32617L90.3556 22.312L47.5207 42.324" stroke="black" strokeWidth="3" />
                  <path d="M90.2482 22.4492H0.858276" stroke="black" strokeWidth="3" />
                </svg>
              </div>

              <div className="w-[460px] select-none h-[240px] relative grid grid-rows-4 grid-cols-4 p-[2rem]">
                <svg className="left-0 absolute top-0" width="83" height="244" viewBox="0 0 83 244" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M82.6635 11.043H11.0345V233.119H82.6635V243.375H0.883179V0.787109H82.6635V11.043Z" fill="#E6E6E6" />
                </svg>
                <svg className="right-0 absolute top-0" width="82" height="243" viewBox="0 0 82 243" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.219727 232.465L71.8486 232.465L71.8487 10.3887L0.219747 10.3887L0.219748 0.132805L82 0.132812L82 242.721L0.219727 242.721L0.219727 232.465Z" fill="#E6E6E6" />
                </svg>
                {Array.from(Array(16)).map((_, index) => {
                  return <div className="flex justify-center text-[1.5rem] font-mono leading-none items-center" key={index}>0.16</div>
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="h-[20rem] w-screen bg-white">
          <div className={`${styles.vLine} absolute w-screen h-full`}>
            <div id="vLine1" className={`${styles.vLine1} w-[1px] h-full bg-black`}></div>
            <div id="vLine2" className={`${styles.vLine2} w-[1px] h-full bg-black`}></div>
            <div id="vLine3" className={`${styles.vLine3} w-[1px] h-full bg-black`}></div>
            <div id="vLine4" className={`${styles.vLine4} w-[1px] h-full bg-black`}></div>
            <div id="vLine5" className={`${styles.vLine5} w-[1px] h-full bg-black`}></div>
            <div id="vLine6" className={`${styles.vLine6} w-[1px] h-full bg-black`}></div>
            <div id="vLine7" className={`${styles.vLine7} w-[1px] h-full bg-black`}></div>
          </div>
        </div>
        <div className="w-[100vw]  bg-[#fff] flex justify-start flex-col items-start  ">

          <div className={`${styles.hLine} absolute w-screen h-full`}>
            <div id="hLine1" className={` w-screen h-[1px] bg-black translate-y-[calc(8rem-3px)]`}></div>
            <div id="hLine2" className={` w-screen h-[1px] bg-black translate-y-[calc(8rem-3px+818px)]`}></div>
          </div>

          <div className={`${styles.vLine} absolute w-screen h-full`}>
            <div id="vLine1" className={`${styles.vLine1} w-[1px] h-full bg-black`}></div>
            <div id="vLine2" className={`${styles.vLine2} w-[1px] h-full bg-black`}></div>
            <div id="vLine3" className={`${styles.vLine3} w-[1px] h-full bg-black`}></div>
            <div id="vLine4" className={`${styles.vLine4} w-[1px] h-full bg-black`}></div>
            <div id="vLine5" className={`${styles.vLine5} w-[1px] h-full bg-black`}></div>
            <div id="vLine6" className={`${styles.vLine6} w-[1px] h-full bg-black`}></div>
            <div id="vLine7" className={`${styles.vLine7} w-[1px] h-full bg-black`}></div>
          </div>

          <div className="flex flex-row w-full justify-between">
            <div className="px-[28px] ">
              <p className="row-[2_/_3] col-[2_/_3] text-[5rem] leading-none font-thin">
                语意向量
              </p>
              <p className=" text-[2.8rem] leading-none text-gray-400 font-normal ">
                Semantic Vector
              </p>
            </div>
          </div>

          <div className="flex flex-row w-full justify-between relative ">
            <div className=" w-[calc(28px+100vh)] pl-[33.333vh]  h-[1200px]   relative">
              <div className="w-full h-full absolute  overflow-hidden text-[#ddd] font-mono">
                {(imgData[curImgIndex] as unknown as any)?.embedding}
              </div>
              {Array.from(Array(8)).map((_, index) => {
                return <div className={`${styles.splane} bg-amber-500 w-[400px] h-[400px] absolute`}
                  style={{
                    "--translateZ": `${index * 8}rem`,
                    backgroundImage: `url(/vec/${index + 1}.png)`,
                    zIndex: `${8 - index}`,
                    backgroundSize: "cover"
                  } as React.CSSProperties}
                  onMouseEnter={() => { setCurImgIndex(index) }}
                ></div>
              })}
            </div>
            <div className="grid grid-cols-[0.8fr_2fr] gap-[2rem] h-full w-[calc(100vw-28px-100vh)] pr-[28px] m-auto bg-white py-[2rem] translate-x-[1px]">
              <p className={`${styles.vecTitle} font-normal text-[2rem]`}>
                适用产品:
              </p>
              <p className={`${styles.vecContent} font-thin text-[2rem] gap-2 flex justify-start items-start flex-wrap`}>
                {
                  (imgData[curImgIndex] as unknown as any)?.describe?.productType.map((e: string, index: number) => {
                    return <span className="bg-pink-200 rounded-[2rem] px-4 py-2 text-[1.8rem] ">{e}</span>
                  })
                }
              </p>
              <p className={`${styles.vecTitle} font-normal text-[2rem]`}>
                风格倾向:
              </p>
              <p className={`${styles.vecContent} font-thin text-[2rem]`}>{(imgData[curImgIndex] as unknown as any)?.describe?.styleTendency}</p>
              <p className={`${styles.vecTitle} font-normal text-[2rem]`}>
                适用用户:
              </p>
              <p className={`${styles.vecContent} font-thin text-[2rem]`}>{(imgData[curImgIndex] as unknown as any)?.describe?.titleUser}</p>
              <p className={`${styles.vecTitle} font-normal text-[2rem]`}>
                适用风格:
              </p>
              <p className={`${styles.vecContent} font-thin text-[2rem]`}>{(imgData[curImgIndex] as unknown as any)?.describe?.historyStyle}</p>
              <p className={`${styles.vecTitle} font-normal text-[2rem]`}>
                画面感受:
              </p>
              <p className={`${styles.vecContent} font-thin text-[2rem]`}>{(imgData[curImgIndex] as unknown as any)?.describe?.sense}</p>
              <p className={`${styles.vecTitle} font-normal text-[2rem]`}>
                意向感受:
              </p>
              <p className={`${styles.vecContent} font-thin text-[2rem]`}>{(imgData[curImgIndex] as unknown as any)?.describe?.otherSenses}</p>
              <p className={`${styles.vecTitle} font-normal text-[2rem]`}>
                适用节点:
              </p>
              <p className={`${styles.vecContent} font-thin text-[2rem] gap-2 flex justify-start items-start flex-wrap`}>
                {
                  (imgData[curImgIndex] as unknown as any)?.describe?.festivalNode.map((e: string, index: number) => {
                    return <span className="bg-amber-100 rounded-[2rem] px-4 py-2 text-[1.8rem] "
                    >{e}</span>
                  })
                }
              </p>
              <p className={`${styles.vecTitle} font-normal text-[2rem]`}>
                色彩倾向:
              </p>
              <p className={`${styles.vecContent} font-thin text-[2rem]`}>{(imgData[curImgIndex] as unknown as any)?.describe?.colorTendency}</p>
              <p className={`${styles.vecTitle} font-normal text-[2rem]`}>
                颜色:
              </p>
              <p className={`${styles.vecContent} font-thin text-[2rem] flex gap-2 justify-start items-start flex-wrap `}>
                {
                  (imgData[curImgIndex] as unknown as any)?.describe?.colorSorting.map((e: string, index: number) => {
                    return <span className="rounded-[2rem] px-4 py-2 text-[1.8rem] "
                      style={{
                        backgroundColor: `${e}`,
                        color: e === "#000000" ? "white" : "black"
                      }}
                    >{e}</span>
                  })
                }
              </p>

            </div>
          </div>
        </div>
        <div className="h-[20rem] w-screen bg-white">
          <div className={`${styles.vLine} absolute w-screen h-full`}>
            <div id="vLine1" className={`${styles.vLine1} w-[1px] h-full bg-black`}></div>
            <div id="vLine2" className={`${styles.vLine2} w-[1px] h-full bg-black`}></div>
            <div id="vLine3" className={`${styles.vLine3} w-[1px] h-full bg-black`}></div>
            <div id="vLine4" className={`${styles.vLine4} w-[1px] h-full bg-black`}></div>
            <div id="vLine5" className={`${styles.vLine5} w-[1px] h-full bg-black`}></div>
            <div id="vLine6" className={`${styles.vLine6} w-[1px] h-full bg-black`}></div>
            <div id="vLine7" className={`${styles.vLine7} w-[1px] h-full bg-black`}></div>
          </div>
          <div>
          </div>
        </div>
        <div className=" w-screen bg-white pb-[20rem]">

          <div className={`${styles.hLine} absolute w-screen h-full`}>
            <div id="hLine1" className={` w-screen h-[1px] bg-black translate-y-[calc(8rem-3px)]`}></div>
            <div id="hLine2" className={` w-screen h-[1px] bg-black translate-y-[calc(8rem-3px+818px)]`}></div>
          </div>

          <div className={`${styles.vLine} absolute w-screen h-full`}>
            <div id="vLine1" className={`${styles.vLine1} w-[1px] h-full bg-black`}></div>
            <div id="vLine2" className={`${styles.vLine2} w-[1px] h-full bg-black`}></div>
            <div id="vLine3" className={`${styles.vLine3} w-[1px] h-full bg-black`}></div>
            <div id="vLine4" className={`${styles.vLine4} w-[1px] h-full bg-black`}></div>
            <div id="vLine5" className={`${styles.vLine5} w-[1px] h-full bg-black`}></div>
            <div id="vLine6" className={`${styles.vLine6} w-[1px] h-full bg-black`}></div>
            <div id="vLine7" className={`${styles.vLine7} w-[1px] h-full bg-black`}></div>
          </div>

          <div className="flex flex-row w-full justify-between">
            <div className="px-[28px] ">
              <p className="row-[2_/_3] col-[2_/_3] text-[5rem] leading-none font-thin">
                召回
              </p>
              <p className=" text-[2.8rem] leading-none text-gray-400 font-normal ">Retrieval</p>
            </div>
          </div>

          <div className="mt-[10rem] select-none ">
            <img src="/vec/flow.svg" className="select-none z-100 relative w-[100vh] ml-[calc(28px+33.3333vh)]" />
          </div>
        </div>
      </div>
    </div>
  </div>;
}
