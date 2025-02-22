"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, X, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useState } from "react";

const navbarComponents = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Testimonials",
    href: "#testimonials",
  },
  {
    title: "Help",
    href: "#help",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full h-[100px] bg-background p-6 flex justify-center items-center">
      <div className="w-full h-full sm:max-w-[75%] flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold">CritQ</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex space-x-10">
            {navbarComponents.map((item, index = Math.random()) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild>
                  <Link href={item.href} className="hover:text-white/60">
                    <span>{item.title}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex space-x-4 ">
          <Link href="/login">
            <Button variant="outline">
              <span>Login</span>
            </Button>
          </Link>
          <Link href="/signup">
            <Button>
              <span className="font-bold">Sign Up</span>
            </Button>
          </Link>
        </div>
        {/* <Button
          className="lg:hidden text-white bg-background hover:bg-background hover:text-white/50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </Button>
        {isOpen && (
          <div className="absolute z-50 top-20 left-0 w-full h-full bg-background/90 backdrop-blur-sm drop-shadow-xl p-6 flex flex-col items-center space-y-5 lg:hidden">
            {navbarComponents.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-white hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="w-full text-black font-semibold">
                Start for free
              </Button>
            </Link>
          </div>
        )} */}
      </div>
    </header>
  );
}
