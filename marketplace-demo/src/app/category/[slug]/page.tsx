import React from "react";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Placeholder for fetching category items
  // TODO: Fetch items for the category from API
  const items = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    title: "Item " + (i + 1),
    price: 2300,
    description: "Lorem ipsum dolor sit",
    location: "Palo Alto, CA",
    image: "https://placehold.co/400x300/EEE/CCC?text=Item",
  }));
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 capitalize">{params.slug.replace(/-/g, ' ')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
            <img src={item.image} alt={item.title} className="rounded mb-2 h-40 object-cover bg-gray-100" />
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