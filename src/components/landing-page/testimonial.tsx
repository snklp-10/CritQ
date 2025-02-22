"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TitleSection from "./titleSection";

const testimonials = [
  {
    name: "Alex Carter",
    role: "Tech Enthusiast",
    text: "CritQ saved me from wasting money on a low-quality product! The reviews are super detailed and helpful.",
    img: "/UserImages/1.png",
  },
  {
    name: "Sophia Lee",
    role: "Frequent Shopper",
    text: "I love how CritQ ensures verified reviews. It feels like a real community looking out for each other!",
    img: "/UserImages/2.png",
  },
  {
    name: "Mira Smith",
    role: "Online Buyer",
    text: "Finally, a place where I can voice my bad experiences and help others avoid the same mistakes!",
    img: "/UserImages/3.png",
  },
  {
    name: "Emma Johnson",
    role: "Small Business Owner",
    text: "CritQ has been a game-changer for my business, helping me identify unreliable suppliers!",
    img: "/UserImages/4.png",
  },
  {
    name: "Daniel Martinez",
    role: "E-Commerce Expert",
    text: "I rely on CritQ before making any online purchase. The community feedback is invaluable!",
    img: "/UserImages/5.png",
  },
  {
    name: "Olive Brown",
    role: "Student",
    text: "I almost fell for a scam, but thanks to CritQ, I avoided the scam! This platform is truly a lifesaver.",
    img: "/UserImages/6.png",
  },
  {
    name: "Liam Wilson",
    role: "Gadget Reviewer",
    text: "I appreciate the honest, verified and unfiltered reviews on CritQ. It's a breath of fresh air!",
    img: "/UserImages/7.png",
  },
  {
    name: "Mia Thompson",
    role: "Freelancer",
    text: "A great platform for holding brands accountable and making informed decisions!",
    img: "/UserImages/8.png",
  },
  {
    name: "Noah White",
    role: "Travel Blogger",
    text: "CritQ helped me avoid a terrible hotel booking. Definitely recommending it to fellow travelers!",
    img: "/UserImages/9.png",
  },
  {
    name: "Avan Garcia",
    role: "Fashion Enthusiast",
    text: "I love how CritQ allows me to see real customer feedback before buying from new brands!",
    img: "/UserImages/10.png",
  },
];

export default function TestimonialSection() {
  return (
    <div className="w-full px-6 md:px-12 py-10">
      <TitleSection
        title="Trusted by all"
        subheading="Join thousands of informed consumers who trust CritQ to make smarter purchasing decisions and avoid bad experiences."
        pill="Testimonials"
      />

      <div className="relative flex flex-wrap justify-center gap-6 mt-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="relative bg-background border p-6 rounded-2xl shadow-lg md:max-w-sm"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <p className="text-gray-700 dark:text-gray-300">
              "{testimonial.text}"
            </p>
            <div className="flex items-center mt-4">
              <Image
                src={testimonial.img}
                alt={testimonial.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-3">
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
