"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const navbarComponents = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "Reviews",
    href: "#reviews",
  },
  {
    title: "Blacklist",
    href: "#blacklist",
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
  return (
    <header className="w-full bg-background p-4 flex justify-between items-center">
      <Link href="/">
        <span className="text-2xl font-bold">CritQ</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="hidden md:flex space-x-6">
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
    </header>
  );
}
