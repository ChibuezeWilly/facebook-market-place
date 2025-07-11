"use client";
import React, { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/layout/header";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [category, setCategory] = useState('');

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-200`}
      >
        <Header
          categories={categories}
          category={category}
          setCategory={setCategory}
        />

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
