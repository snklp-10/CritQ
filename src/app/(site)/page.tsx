import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Banner from "../../../public/CritQ Hero IMage.png";
import Image from "next/image";
import Featuregrid from "@/components/landing-page/featuregrid";
import TestimonialSection from "@/components/landing-page/testimonial";
import TitleSection from "@/components/landing-page/titleSection";
const HomePage = () => {
  return (
    <>
      <section className="flex flex-col md:items-center mdjustify-center sm:text-center px-6 py-12 text-white">
        <TitleSection
          pill="✨Your Review Common place"
          title="Expose Bad Products & Services"
          subheading="Share your online shopping experiences and help others avoid bad
          purchases."
        />
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
      <section id="features">
        <Featuregrid />
      </section>
      <section id="testimonials">
        <TestimonialSection />
      </section>
      <section className="mt-10 mb-20">
        <div className="md:text-center text-white px-6 rounded-lg">
          <TitleSection
            pill="Here's your chance"
            title="Join the CritQ community Today!"
            subheading="Help others make better decisions while avoiding bad experiences. Sign up and start sharing your reviews now!"
          />
          <div className="mt-5 flex md:justify-center gap-4">
            <Button className="text-black font-semibold py-3 text-lg px-6 rounded-lg">
              <Link href="/signup">Join now</Link>
            </Button>
          </div>
        </div>
      </section>
      <div className="w-full border"></div>
      <section>
        <footer className="py-6 text-center">
          <p className="mt-4 text-xs">© 2025 CritQ. All rights reserved.</p>
        </footer>
      </section>
    </>
  );
};

export default HomePage;
