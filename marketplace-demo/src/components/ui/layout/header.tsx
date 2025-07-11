"use client";
import React from "react";
import MobileNavbar from "./mobilenavbar";
import { useState } from "react";
import { MessageCircle, User, Bell, Menu } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
  categories: string[];
  category: string;
  setCategory: (v: string) => void;
};

export default function Header({
  categories,
  category,
  setCategory,
 
}: HeaderProps) {
  const [showMobileNavbar, setShowMobileNavbar] = useState(false);

  const openMobileNavbar = () => {
    setShowMobileNavbar(true);
  };

  const closeMobileNavbar = () => {
    setShowMobileNavbar(false);
  };

  return (
    <>
      <header className="flex items-center justify-between px-3 md:px-14 py-4 bg-white shadow-sm sticky top-0 z-10">
        <Link
          className="flex items-center gap-3 cursor-pointer z-20"
          href={"/"}
        >
          <div className="bg-[#1877F2] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
            F
          </div>
          <span className="font-bold text-xl text-[#1877F2]">Marketplace</span>
        </Link>
        <div className="flex flex-row justify-center items-center text-xs gap-3 sm:gap-6">
          <MessageCircle className="w-5 h-6 " onClick={openMobileNavbar} />
          <Bell className="w-5 h-6" />
          <User className="w-5 h-6" />
          <button className="lg:hidden" onClick={openMobileNavbar}>
            <Menu className="w-9 h-9" />
          </button>
        </div>
      </header>
      {showMobileNavbar && (
        <MobileNavbar
          closeMobileNavbar={closeMobileNavbar}
          categories={categories}
          category={category}
          setCategory={setCategory}
          setShowMobileNavbar={setShowMobileNavbar}
        />
      )}
    </>
  );
}
