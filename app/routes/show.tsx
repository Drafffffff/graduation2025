import styles from "../style/show.module.css"

export default function Show() {


  return <div className="bg-[#202020] w-screen h-screen overflow-hidden select-none  ">
    <div className="w-screen h-screen overflow-hidden select-none  " style={{
      backgroundImage: "url('/show/bg.png')",
      backgroundSize: "contain"
    }}>
      <img id="img1" src="/show/1.png" className={`${styles.img1} absolute w-[8vw] top-[56vh] left-[6.8vw]`} />

      <img id="img2" src="/show/2.png" className={`${styles.img2} absolute w-[6.5vw] top-[56vh] left-[25.2vw]`} />

      <img id="img3" src="/show/3.png" className={`${styles.img3} absolute w-[8vw] top-[50vh] left-[40.85vw] z-[9]`} />
      <img id="img4" src="/show/4.png" className={`${styles.img4} absolute w-[8vw] top-[56vh] left-[43.8vw] z-[8]`} />
      <img id="img5" src="/show/5.png" className={`${styles.img5} absolute w-[8vw] top-[46vh] left-[46.8vw] z-[7]`} />
      <img id="img6" src="/show/6.png" className={`${styles.img6} absolute w-[8vw] top-[56vh] left-[49.8vw] z-[6]`} />
      <img id="img7" src="/show/7.png" className={`${styles.img7} absolute w-[8vw] top-[56vh] left-[53.2vw] z-[5]`} />

      <img id="img8" src="/show/8.png" className={`${styles.img8} absolute w-[8vw] top-[49vh] left-[64.4vw] z-[9]`} />
      <img id="img9" src="/show/9.png" className={`${styles.img9} absolute w-[8vw] top-[46vh] left-[69.4vw] z-[6]`} />
      <img id="img10" src="/show/10.png" className={`${styles.img10} absolute w-[8vw] top-[46vh] left-[73.1vw] z-[5]`} />

      <img id="img11" src="/show/11.png" className={`${styles.img11} absolute w-[8vw] top-[46vh] left-[86.6vw] z-[5]`} />

    </div>



  </div>

}
