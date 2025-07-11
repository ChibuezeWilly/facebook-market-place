"use client";
import React from "react";
import { Tags, User } from "lucide-react";
import Link from "next/link";

type MobileNavbarProps = {
  closeMobileNavbar: () => void;
  categories: string[];
  category: string;
  setCategory: (v: string) => void;
};
export default function MobileNavbar({
  closeMobileNavbar,
  categories,
  category,
  setCategory,
}: MobileNavbarProps) {
  return (
    <nav className="fixed inset-0 z-50 bg-white flex flex-col p-4 z-50">
      {/* Close Button */}
      <button
        className="self-end text-2xl font-bold mb-4"
        onClick={closeMobileNavbar}
        aria-label="Close menu"
      >
        ✕
      </button>

      {/* Create New Listing Section */}
      <section className="mb-6 cursor-pointer">
        <h2 className="font-bold text-lg mb-2">Create new listing</h2>
        <ul className="flex flex-col gap-3">
          <Link className="text-sm flex flex-row gap-4" href={"/create"}>
            <Tags className="w-5 h-6 " />
            <span>Choose listing type</span>
          </Link>
          <Link className="text-sm flex flex-row gap-4" href={"/"} >
            <Tags className="w-5 h-6 " />
            <span>Your listing</span>
          </Link>
          <Link className="text-sm flex flex-row gap-4" href={""}>
            <User className="w-5 h-6 " />
            <span>Seller help</span>
          </Link>
        </ul>
      </section>

      {/* Categories Section */}
      <section className="flex-1 overflow-y-auto z-50">
        <h2 className="font-bold text-lg mb-2">Categories</h2>
        <ul className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <li key={cat} className="w-1/2 sm:w-1/3">
              <button
                className={`block w-full text-left text-gray-700 text-sm px-3 py-3 rounded-lg hover:bg-[#f0f4fa] transition ${
                  category === cat
                    ? "bg-[#e7f0fd] text-[#1877F2] font-semibold"
                    : ""
                }`}
                onClick={() => {
                  setCategory(cat);
                  closeMobileNavbar();
                }}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
}
