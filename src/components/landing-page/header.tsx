import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="p-4 flex justify-center items-center">
      <Link href={"/"} className="w-full justify-left items-center gap-2">
        <span className="font-extrabold text-2xl">CrtiQ</span>
      </Link>
    </header>
  );
};

export default Header;
