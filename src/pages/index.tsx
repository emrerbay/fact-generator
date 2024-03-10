import { useEffect, useState } from "react";
import Image from "next/image";
import Icon from "@/public/random_fact.svg";
import Link from "next/link";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Image
        src={Icon}
        alt="Icon"
        width={120}
        height={120}
        className="mb-2"
      ></Image>
      <h1 className="md:text-4xl text-2xl font-bold mb-4">
        Welcome to Fact Generator
      </h1>
      <p className="text-lg text-gray-300">Explore interesting facts here!</p>
      <Link href={"/api/auth/login?returnTo=/factviewer"} passHref>
        <button
          disabled={isLoading}
          onClick={() => setIsLoading(true)}
          className={`border-2 hover:scale-110 duration-300 opacity-90 w-36 hover:opacity-90 hover:bg-teal-500 hover:border-teal-500 bg-slate-500 rounded-md p-2 mt-8 border-slate-500 ${isLoading && "cursor-wait"}`}
        >
          {isLoading ? "Loading..." : "Learn Facts"}
        </button>
      </Link>
    </div>
  );
};

export default Home;
