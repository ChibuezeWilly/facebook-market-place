"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../components/ui/layout/sidebar";
import { fetchListings } from "@/lib/api";

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

type Listing = {
  id: string | number;
  title: string;
  description: string;
  price: number | string;
  image_url?: string;
  location?: string;
};

type MobileNavbarProps = {
  closeMobileNavbar: () => void;
  categories: string[];
  category: string;
  setCategory: (v: string) => void;
};

export default function MarketplaceHome() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch listings from API
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetchListings()
      .then(data => {
        setListings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load listings.');
        setLoading(false);
        console.error('Error fetching listings:', err);
      });
  }, []);

  const filtered = (listings || []).filter(
    (l) =>
      (l.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (l.description || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-[var(--font-geist-sans)] ">
      <div className="px-2 md:px-8 lg:px-14 py-3 md:py-6">
        <Sidebar
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
        <main className="flex flex-col md:ml-64">
          <h2 className="text-2xl text-black font-bold mb-6">Today's picks</h2>
          {error && (
            <div className="text-center py-4 text-red-500">{error}</div>
          )}
          {loading ? (
            <div className="text-center py-20 text-gray-400">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center ">
              {filtered.map((listing) => (
                <Link
                  key={listing.id || Math.random()}
                  href={`/item/${listing.id ?? ""}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col overflow-hidden group border border-transparent hover:bg-gray-200 w-40 py-3"
                >
                  <div className="h-40 bg-gradient-to-br from-[#e7f0fd] to-[#f5f6fa] flex items-center justify-center rounded-md">
                    <img
                      src={listing.image_url || "/assets/images/smartwatch-image.jpg"}
                      className="object-cover w-full h-full"
                      alt={listing.title}
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="font-bold mb-1 text-lg text-black">
                      ${listing.price ?? "N/A"}
                    </div>

                    <div className="text-gray-500 text-sm truncate">
                      {listing.description ?? ""}
                    </div>
                    <div className="text-xs text-gray-400 mt-auto mt-2">
                      {listing.location || "Palo Alto, CA"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
