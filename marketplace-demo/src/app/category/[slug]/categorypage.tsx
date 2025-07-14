"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

export default function CategoryPage({ slug }: { slug: string }) {
  // Example placeholder items — replace with real data
  const items = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    title: "Item " + (i + 1),
    price: 2300,
    description: "Lorem ipsum dolor sit",
    location: "Palo Alto, CA",
    image: "https://placehold.co/400x300/EEE/CCC?text=Item",
  }));

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 capitalize">
        {slug.replace(/-/g, " ")}
      </h1>

      {/* Search input */}
      <div className="flex flex-col md:flex-row gap-2 w-full mb-8">
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Search listings"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-black text-white px-6 py-2 rounded w-full md:w-auto"
          onClick={() => setQuery(search)}
        >
          Search
        </button>
      </div>

      {/* Listings grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col"
          >
            <Image
              src={item.image}
              alt={item.title}
              className="rounded mb-2 h-40 object-cover bg-gray-100"
              width={160}
              height={160}
            />
            <div className="font-bold text-lg">${item.price}</div>
            <div className="text-gray-700">{item.title}</div>
            <div className="text-gray-500 text-sm">{item.description}</div>
            <div className="text-xs text-gray-400 mt-1">{item.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
