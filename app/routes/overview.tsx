import type { Route } from "./+types/overview";
import { Link } from "react-router";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import Back from "~/components/back";
import styles from "../style/overview.module.css";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "功能总览 - PicCopilot" },
    { name: "description", content: "PicCopilot AI海报设计师的完整功能介绍和概念说明" },
  ];
}

export default function Overview() {
  const gsapContainer = useRef<HTMLDivElement>(null);
  
  useGSAP((context, contextSafe) => {
    if (!contextSafe) return;

    // Create scroll smoother
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });

    // Grid lines animation
    gsap.from("#hLine1", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.1 });
    gsap.from("#hLine2", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.2 });
    gsap.from("#hLine3", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.4 });
    gsap.from("#hLine4", { width: 0, duration: 1, ease: "power4.inOut", delay: 0.1 });
    gsap.from("#vLine1", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.4 });
    gsap.from("#vLine2", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.3 });
    gsap.from("#vLine3", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.1 });
    gsap.from("#vLine4", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.2 });
    gsap.from("#vLine5", { height: 0, duration: 1, ease: "power4.inOut", delay: 0.5 });

    // Header animations
    gsap.from("#title", { opacity: 0, y: 50, duration: 1, ease: "power4.inOut", delay: 0.5 });
    gsap.from("#subtitle", { opacity: 0, y: 30, duration: 1, ease: "power4.inOut", delay: 0.7 });
    gsap.from("#description", { opacity: 0, y: 30, duration: 1, ease: "power4.inOut", delay: 0.9 });

    // Module cards animation with scroll trigger
    gsap.utils.toArray(".moduleCard").forEach((card: any, index) => {
      gsap.fromTo(card, 
        { 
          opacity: 0, 
          y: 100,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.1
        }
      );
    });

  }, { scope: gsapContainer });

  const modules = [
    {
      id: "cot",
      icon: "思",
      title: "思维链",
      subtitle: "Chain of Thought",
      description: "基于人工智能的逻辑推理链，模拟设计师的思考过程，从用户需求出发，通过多步骤推理生成符合逻辑的设计方案。",
      features: [
        "多步骤逻辑推理",
        "设计决策解释",
        "智能设计建议",
        "用户意图理解"
      ],
      link: "/cot",
      color: "#6CF1AC"
    },
    {
      id: "vec",
      icon: "向",
      title: "语义向量",
      subtitle: "Semantic Embedding",
      description: "通过深度学习技术将视觉元素转换为高维向量空间，实现图像语义的精确理解和匹配，支持基于内容的智能搜索和推荐。",
      features: [
        "视觉语义理解",
        "内容智能匹配",
        "相似度计算",
        "语义搜索引擎"
      ],
      link: "/vec",
      color: "#80C4F1"
    },
    {
      id: "col",
      icon: "色",
      title: "配色算法",
      subtitle: "Color Algorithm",
      description: "基于色彩理论和人工智能的智能配色系统，能够从图片中提取主题色彩，生成和谐的配色方案，提升设计的视觉效果。",
      features: [
        "主色调提取",
        "和谐配色生成",
        "色彩心理分析",
        "品牌色彩匹配"
      ],
      link: "/col",
      color: "#F48DD2"
    },
    {
      id: "lay",
      icon: "版",
      title: "版式文法",
      subtitle: "Flex Layout",
      description: "运用现代版式设计理论和算法，自动生成符合视觉层次和阅读习惯的布局方案，确保信息传达的有效性和美观性。",
      features: [
        "自动版式生成",
        "视觉层次优化",
        "响应式布局",
        "网格系统设计"
      ],
      link: "/lay",
      color: "#FFA770"
    },
    {
      id: "gen",
      icon: "创",
      title: "智能生成",
      subtitle: "AI Generation",
      description: "整合所有AI能力的创作工具，用户只需输入简单描述，系统即可生成完整的海报设计方案，实现从创意到成品的一键生成。",
      features: [
        "一键设计生成",
        "文本到图像转换",
        "风格迁移",
        "批量创作"
      ],
      link: "/gen",
      color: "#E7FE79"
    }
  ];

  return (
    <div ref={gsapContainer} className={styles.container}>
      {/* Grid overlay */}
      <div className={styles.gridOverlay}>
        <div id="hLine1" className={`${styles.hLine1} w-screen h-[1px] bg-white`}></div>
        <div id="hLine2" className={`${styles.hLine2} w-screen h-[1px] bg-white`}></div>
        <div id="hLine3" className={`${styles.hLine3} w-screen h-[1px] bg-white`}></div>
        <div id="hLine4" className={`${styles.hLine4} w-screen h-[1px] bg-white`}></div>
        <div id="vLine1" className={`${styles.vLine1} w-[1px] h-screen bg-white`}></div>
        <div id="vLine2" className={`${styles.vLine2} w-[1px] h-screen bg-white`}></div>
        <div id="vLine3" className={`${styles.vLine3} w-[1px] h-screen bg-white`}></div>
        <div id="vLine4" className={`${styles.vLine4} w-[1px] h-screen bg-white`}></div>
        <div id="vLine5" className={`${styles.vLine5} w-[1px] h-screen bg-white`}></div>
      </div>

      {/* Back button */}
      <Back />

      {/* Header section */}
      <header className={styles.header}>
        <h1 id="title" className={styles.title}>
          功能总览
        </h1>
        <h2 id="subtitle" className={styles.subtitle}>
          PicCopilot - AI时代的海报设计师
        </h2>
        <p id="description" className={styles.description}>
          PicCopilot 是一个基于人工智能的海报设计平台，集成了思维链推理、语义向量理解、智能配色算法和版式文法等核心技术，
          为用户提供从创意构思到设计实现的完整解决方案。通过模拟专业设计师的思考过程，
          PicCopilot 能够理解用户需求并生成高质量的设计作品。
        </p>
      </header>

      {/* Modules grid */}
      <section className={styles.modulesGrid}>
        {modules.map((module) => (
          <div key={module.id} className={`moduleCard ${styles.moduleCard}`}>
            <div className={styles.moduleHeader}>
              <div 
                className={`${styles.moduleIcon} ${styles[module.id]}`}
                style={{ backgroundColor: module.color }}
              >
                {module.icon}
              </div>
              <div>
                <h3 className={styles.moduleTitle}>{module.title}</h3>
                <p className={styles.moduleSubtitle}>{module.subtitle}</p>
              </div>
            </div>
            
            <p className={styles.moduleDescription}>
              {module.description}
            </p>
            
            <ul className={styles.moduleFeatures}>
              {module.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            
            <Link to={module.link} className={styles.moduleLink}>
              了解更多 →
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}