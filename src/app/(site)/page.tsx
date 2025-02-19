import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Banner from "../../../public/CritQ Hero IMage.png";
import Image from "next/image";
import Featuregrid from "@/components/landing-page/featuregrid";
const HomePage = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center sm:text-center px-6 py-12 sm:py-16 md:py-32  text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-5xl">
          Expose Bad Products & Services.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mt-4 md:max-w-xl max-w-md">
          Share your online shopping experiences and help others avoid bad
          purchases.
        </p>
        <div className="w-full flex sm:justify-center items-center">
          <Button className="mt-6 px-6 py-3 text-lg font-semibold rounded-lg">
            <Link href="/signup">
              <span>Get Started</span>
            </Link>
          </Button>
        </div>
        <div
          className="
          sm:w-full
          flex
          justify-center
          items-center
          mt-[40px]
          relative
        "
        >
          <Image src={Banner} alt="Application Banner" />
          <div
            className="bottom-0
            top-[50%]
            bg-gradient-to-t
            dark:from-background
            left-0
            right-0
            absolute
            z-10
          "
          ></div>
        </div>
      </section>
      <section className="pb-24">
        <Featuregrid />
      </section>
    </>
  );
};

export default HomePage;
