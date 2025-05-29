import Back from "~/components/back";
import styles from "../style/gen.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useState } from "react";

export default function Gen() {
  const [inputMessage, setInputMessage] = useState<string>("")
  const [sendState, setSendState] = useState(0)
  return <>
    <div className="w-screen h-screen overflow-hidden bg-black z-0">
      <div className="h-screen w-screen fixed" style={{
        zIndex: 2000,
        backgroundImage: "url('/gen/mask.svg')"
      }}></div>
      <div className="sper w-full h-full grid grid-cols-6 gap-10 opacity-45">
        {Array.from({ length: 6 }).map((_, swindex) => {
          return <Swiper
            id="swiper"
            direction="vertical"
            slidesPerView={"auto"}
            loop={true}
            key={swindex}
            autoplay={{
              delay: 0,
            }}
            speed={2000}
            allowTouchMove={false}
            // freeMode={true}
            modules={[Autoplay]}
            className="pointer-events-none select-none"
          >
            {
              Array.from({ length: 9 }).map((_, index) => {
                return (<SwiperSlide className="!h-auto" key={index}>

                  <div className={`flex  justify-between items-start`}>
                    <img src={`/gen/${swindex + 1}/${index + 1}.jpg`} className="rounded-2xl" />
                  </div>
                </SwiperSlide>)
              })
            }
          </Swiper>

        })}


      </div>
      <div className="h-screen w-screen fixed top-0 p-[10rem] flex flex-col-reverse justify-start items-start" style={{
        zIndex: 2001,
      }}>
        <div className="w-full h-[100px] bg-white flex">
          <input value={inputMessage} className="w-full h-full p-[1rem] text-[1.3rem]" placeholder="请输入你的海报需求" />
          {!sendState ? <img onClick={() => { setSendState(1) }} src="/gen/btn.svg" className="h-[75px] m-auto pr-3 select-none cursor-pointer" /> : <img src="/gen/loading.svg" className={`h-[75px] m-auto pr-3 select-none cursor-pointer ${styles.spin}`} />}
        </div>
        <div className="w-full  h-[100px]  flex items-center cursor-pointer">
          <p className="inline-block bg-white p-5 cursor-pointer rounded-2xl font-thin text-gray-800"
            onClick={() => {
              setInputMessage("我需要设计一张毕业展海报，主题是“愿景剧场”。")
            }}
          >我需要设计一张毕业展海报，主题是“愿景剧场”。</p>
        </div>
      </div>

    </div>
    <Back />
  </>
}
