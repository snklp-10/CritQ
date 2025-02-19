"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "Blacklist System",
    description: "Track and report unreliable products/services.",
    img: "/FeatureImages/Blacklist.png",
    className: "col-span-1 row-span-1", // Top-left
  },
  {
    title: "User Reviews & Ratings",
    description: "View detailed user reviews with images.",
    img: "/FeatureImages/Reviews.png",
    className: "col-span-1 row-span-1", // Top-right (wider)
  },
  {
    title: "Verified Purchases",
    description: "Ensure authentic feedback from real buyers.",
    img: "/FeatureImages/Users.png",
    className: "col-span-1 row-span-1", // Bottom-left (full width)
  },
  {
    title: "Community Discussions",
    description: "Engage in discussions about product experiences.",
    img: "/FeatureImages/Community.png",
    className: "col-span-1 row-span-1", // Bottom-right
  },
];

export default function BentoGrid() {
  return (
    <div className="w-full px-6 lg:px-12 py-6 space-y-4 flex flex-col items-center justify-center">
      <span className="flex md:items-center md:justify-center justify-left w-full text-3xl md:text-5xl font-extrabold md:text-center ">
        Explore CritQ Features
      </span>
      <span className="text-lg font-light sm:text-center text-white/70 md:max-w-3xl max-w-md">
        From detailed reviews to a collaborative blacklist—CritQ empowers you to
        make smarter choices and avoid bad experiences
      </span>

      {/* Desktop Layout - Matches Provided Image */}
      <div className="hidden md:grid lg:grid-cols-2 lg:grid-rows-2 gap-6 w-[80%] max-h-[50%]">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`bg-background dark:bg-background border p-6 rounded-2xl shadow-lg flex flex-col justify-between ${feature.className}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-sm font-light text-gray-700 dark:text-gray-300">
              {feature.description}
            </p>
            <div className="relative w-full mt-4 overflow-hidden">
              <img
                src={feature.img}
                alt={feature.title}
                className="rounded-lg "
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Layout - 4 Rows */}
      <div className="md:hidden grid grid-cols-1 gap-6 w-full ">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-background dark:bg-background p-6 border rounded-2xl shadow-lg flex flex-col justify-between"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {feature.description}
            </p>
            <div className="relative flex w-full items-center justify-center h-[80vw] mt-4">
              <Image
                src={feature.img}
                alt={feature.title}
                layout="fill"
                objectFit="contain"
                className="rounded-lg w-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
