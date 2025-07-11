"use client";
import React from "react";
import { Tags, User } from "lucide-react";
import Link from 'next/link';

type SidebarProps = {
  categories: string[];
  category: string;
  setCategory: (v: string) => void;
};

export default function Sidebar({
  categories,
  category,
  setCategory,
}: SidebarProps) {
  return (
    <aside className="lg:fixed lg:block z-50 w-60 bg-white p-6 border-r rounded-md h-screen overflow-y-auto hidden" style={{scrollbarWidth: 'none'}}>
      {/* listing category */}
      <div className="mb-5">
        <h1 className="font-bold text-xl mb-2">Create new listing</h1>
        <ul className="list-none flex flex-col items-start justify-evenly text-gray-700 space-y-4 px-2 py-4">
          <Link className="text-sm flex flex-row gap-4" href={'/create'}>
            <Tags className="w-5 h-6 " />
            <span>Choose listing type</span>
          </Link>
          <Link className="text-sm flex flex-row gap-4" href={'/'}>
            <Tags className="w-5 h-6 " />
            <span>Your listing</span>
          </Link>
          <Link className="text-sm flex flex-row gap-4" href={''}>
            <User className="w-5 h-6 " />
            <span>Seller help</span>
          </Link>
        </ul>
      </div>
      {/* listing category */}

      {/* main cetegories */}
      <div className="mb-6">  
        <div className="font-bold mb-2 text-xl">Categories</div>
        <ul className="">
  {categories.map((cat) => (
    <li key={cat}>
      <Link
        href={`/category/${cat.toLowerCase()}`}
        className={`w-full block text-left text-gray-700 text-sm px-2 py-2 rounded hover:bg-[#f0f4fa] transition ${
          category === cat
            ? "bg-[#e7f0fd] text-[#1877F2] font-semibold"
            : ""
        }`}
        onClick={() => setCategory(cat)}
      >
        {cat}
      </Link>
    </li>
  ))}
</ul>
      </div>
      {/* main cetegories */}
    </aside>
  );
}
