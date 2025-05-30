import { useEffect, useState, useRef } from "react"
import styles from "../style/show.module.css"
import { useCrossTabCallback } from "~/components/useCrossTabCommunication";

const MESSAGE_TYPES = {
  GREETING: 'greeting',
  DATA_UPDATE: 'data-update',
  NOTIFICATION: 'notification',
  CUSTOM_ACTION: 'custom-action'
} as const;

const VIDEO_URL = "https://drafff.oss-cn-beijing.aliyuncs.com/%E6%9C%80%E7%BB%88%E5%A4%A7%E5%90%88%E6%88%90.mp4";

export default function Show() {
  const { subscribe } = useCrossTabCallback();
  const [messages, setMessages] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlayingRef = useRef(false); // 使用 ref 跟踪播放状态

  const addMessage = (msg: string) => {
    setMessages(prev => [`${msg}`, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    const unsubscribe = subscribe<string>(MESSAGE_TYPES.GREETING, (payload, sender) => {
      const shortSender = sender.slice(-10);
      addMessage(`收到问候: ${payload} (来自: ...${shortSender})`);

      // 如果视频未播放，则开始播放
      if (!isPlayingRef.current && videoRef.current) {
        startVideoPlayback();
      }
    });

    // 组件挂载时预加载视频
    preloadVideo();

    return () => {
      unsubscribe();
      // 清理视频资源
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, [subscribe]);

  // 预加载视频资源
  const preloadVideo = () => {
    if (!videoRef.current) return;

    // 设置视频源
    videoRef.current.src = VIDEO_URL;
    videoRef.current.load();

    // 静音预加载
    videoRef.current.muted = true;
    videoRef.current.preload = "auto";
  };

  const startVideoPlayback = () => {
    if (!videoRef.current) return;

    isPlayingRef.current = true;

    // 确保视频从头播放
    videoRef.current.currentTime = 0;

    // 显示视频元素
    videoRef.current.style.display = "block";

    // 尝试播放
    const playPromise = videoRef.current.play();

    if (playPromise !== undefined) {
      playPromise.catch(e => {
        console.error("视频播放失败:", e);
        resetVideoState();
      });
    }
  };

  const resetVideoState = () => {
    isPlayingRef.current = false;
    if (videoRef.current) {
      videoRef.current.style.display = "none";
    }
  };

  const handleVideoEnded = () => {
    resetVideoState();
  };

  return (
    <div className="bg-[#202020] w-screen h-screen overflow-hidden select-none">
      <div
        className="w-screen h-screen overflow-hidden select-none"
        style={{
          backgroundImage: "url('/show/bg.png')",
          backgroundSize: "contain"
        }}
      >
        {/* 原有的图片元素 */}
        <img id="img1" src="/show/1.png" className={`${styles.img1} absolute w-[8vw] top-[56vh] left-[6.8vw]`} />
        <img id="img2" src="/show/2.png" className={`${styles.img2} absolute w-[6.5vw] top-[56vh] left-[25.2vw]`} />
        <img id="img3" src="/show/4.png" className={`${styles.img3} absolute w-[8vw] top-[50vh] left-[40.85vw] z-[9]`} />
        <img id="img4" src="/show/3.png" className={`${styles.img4} absolute w-[8vw] top-[56vh] left-[43.8vw] z-[8]`} />
        <img id="img5" src="/show/5.png" className={`${styles.img5} absolute w-[8vw] top-[46vh] left-[46.8vw] z-[7]`} />
        <img id="img6" src="/show/6.png" className={`${styles.img6} absolute w-[8vw] top-[56vh] left-[49.8vw] z-[6]`} />
        <img id="img7" src="/show/7.png" className={`${styles.img7} absolute w-[8vw] top-[56vh] left-[53.2vw] z-[5]`} />
        <img id="img8" src="/show/8.png" className={`${styles.img8} absolute w-[8vw] top-[49vh] left-[64.4vw] z-[9]`} />
        <img id="img9" src="/show/9.png" className={`${styles.img9} absolute w-[8vw] top-[46vh] left-[69.4vw] z-[6]`} />
        <img id="img10" src="/show/10.png" className={`${styles.img10} absolute w-[8vw] top-[46vh] left-[73.1vw] z-[5]`} />
        <img id="img11" src="/show/11.png" className={`${styles.img11} absolute w-[8vw] top-[46vh] left-[86.6vw] z-[5]`} />
      </div>

      {/* 视频元素 - 始终存在但默认隐藏 */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover z-50"
        style={{ display: 'none' }}
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
        onError={resetVideoState}
      />
    </div>
  )
}
