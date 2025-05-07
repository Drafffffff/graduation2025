

import type { Route } from "./+types/home";
import styles from "../style/cot.module.css";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  return <div className={styles.main}>
    <div className="w-[100vw] h-[100vh] bg-[#666] flex justify-center items-center  ">
      <p className="text-white font-bold text-[10rem]  translate-x-80">Colors</p>
    </div>
    <div className="w-[100vw] h-[100vh] bg-[#fff] flex justify-center items-center  ">
    </div>
  </div>;
}


