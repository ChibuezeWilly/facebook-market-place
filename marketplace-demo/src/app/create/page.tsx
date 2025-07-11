"use client"
import Link from "next/link";
import React, { useState } from "react";

import Sidebar from "@/components/ui/layout/sidebar";

const listingTypes = [
  {
    title: "Item for sale",
    description: "Lorem ipsum dolor sit",
    href: "/create/item",
  },
  {
    title: "Create multiple listings",
    description: "Lorem ipsum dolor sit",
    href: "#",
  },
  {
    title: "Vehicle for sale",
    description: "Lorem ipsum dolor sit",
    href: "#",
  },
  {
    title: "Home for sale or rent",
    description: "Lorem ipsum dolor sit",
    href: "#",
  },
];

const categories = [
  "Vehicles",
  "Property Rentals",
  "Apparel",
  "Classifieds",
  "Electronics",
  "Entertainment",
  "Family",
  "Free Stuff",
  "Garden & Outdoor",
  "Hobbies",
  "Home Goods",
  "Home Improvement",
  "Home Sales",
  "Musical Instruments",
  "Office Supplies",
  "Pet Supplies",
  "Sporting Goods",
  "Toys & Games",
  "Buy and sell groups",
];


export default function CreateListingType() {
  const [category, setCategory] = useState("");
  return (
    <div className="px-2 md:px-8 lg:px-14 py-3 md:py-6">
      <Sidebar
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
      <div className="flex flex-col lg:ml-64">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Choose listing type
        </h1>
        <div className="flex flex-wrap gap-6 justify-center">
          {listingTypes.map((type, index) => {
            // Different heights based on index
            let heightClass = "h-48"; // Default height for first and third
            if (index === 1) heightClass = "h-60"; // Second one (longest)
            else if (index === 3) heightClass = "h-52"; // Fourth one (longer than first/third)

            return (
              <Link
                key={type.title}
                href={type.href}
                className={`w-44 ${heightClass} bg-white rounded-lg shadow flex flex-col items-center justify-center hover:shadow-lg transition gap-4`}
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center bg-gray-200">
                  <div className="w-8 h-8 bg-gray-400 rounded-full bg-gray-200"></div>
                </div>
                <div className="font-semibold text-lg mb-1 text-center">
                  {type.title}
                </div>
                <div className="text-gray-500 text-sm">{type.description}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
