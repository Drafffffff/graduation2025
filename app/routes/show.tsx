export default function Show() {

  return <div className="bg-[#202020] w-screen h-screen overflow-hidden select-none  ">
    <div className="w-screen h-screen overflow-hidden select-none  " style={{
      backgroundImage: "url('/show/bg.png')",
      backgroundSize: "contain"
    }}>
      <img src="/show/1.png" className="absolute w-[8vw] top-[56vh] left-[6.8vw]" />
      <img src="/show/2.png" className="absolute w-[7vw] top-[56vh] left-[25.2vw]" />
      <img src="/show/3.png" className="absolute w-[8vw] top-[56vh] left-[6.8vw]" />

    </div>



  </div>

}
