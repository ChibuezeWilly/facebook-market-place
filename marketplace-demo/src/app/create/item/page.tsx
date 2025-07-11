"use client";
import React, { useState } from "react";
import { Camera } from "lucide-react";
import { useStore } from '@/store/useStore';
import { createListing, uploadImage } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function CreateItem() {
  const router = useRouter();
  
  // Form state
  const [photo, setPhoto] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Zustand global state
  const category = useStore((state) => state.category);
  const setCategory = useStore((state) => state.setCategory);
  const email = useStore((state) => state.email);
  const setEmail = useStore((state) => state.setEmail);

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

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = "";
      
      // Upload image if selected
      if (photo) {
        const uploadResult = await uploadImage(photo);
        imageUrl = uploadResult.url || "";
      }

      // Create listing
      const listingData = {
        title,
        price: parseFloat(price),
        seller_email: email, // changed from email to seller_email
        description,
        category,
        image_url: imageUrl,
        location: "Palo Alto, CA", // You can make this dynamic later
      };

      const result = await createListing(listingData);
      
      // Redirect to the new listing or show success
      if (result && result.id) {
        router.push(`/item/${result.id}`);
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('Failed to create listing. Please try again.');
      console.error('Error creating listing:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row py-6 gap-8 px-3 md:px-8 lg:px-16">
      <div className="flex-1 flex flex-col gap-1 max-w-md">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-[#1877F2] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
            F
          </div>
          <span className="font-bold text-xl text-[#1877F2]">Marketplace</span>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="photo" className="font-bold mb-1">Photo</label>
          <label className="border-2 border-dashed rounded-lg h-36 flex items-center justify-center cursor-pointer bg-white" style={{borderWidth: '1px'}} htmlFor="photo">
            <input
              id="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
              required
            />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full object-contain"
              />
            ) : (
              <span className="flex flex-col items-center text-gray-400">
                <Camera className="w-8 h-8 mb-1" />
                Add photos
              </span>
            )}
          </label>
          <label htmlFor="title" className="font-bold mb-1">Title</label>
          <input
            id="title"
            className="border border-gray-300 rounded px-3 py-2"
            style={{borderWidth: '1px'}}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="price" className="font-bold mb-1">Price</label>
          <input
            id="price"
            className="border-2 border-gray-300 rounded px-3 py-2"
            style={{borderWidth: '1px'}}
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="email" className="font-bold mb-1">Email</label>
          <input
            id="email"
            className="border-2 border-gray-300 rounded px-3 py-2"
            style={{borderWidth: '1px'}}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="description" className="font-bold mb-1">Description</label>
          <textarea
            id="description"
            className="border-2 border-gray-300 rounded px-3 py-2 overflow-hidden w-80"
            style={{borderWidth: '1px'}}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="category" className="font-bold mb-1">Category</label>
          <select
            id="category"
            className="border-2 border-gray-300 rounded px-3 py-2"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded py-2 mt-2 w-full disabled:bg-gray-400"
          >
            {loading ? 'Creating...' : 'Next'}
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-2">Preview</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-96 bg-gray-100 rounded mb-4 flex items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full object-contain"
              />
            ) : (
              <span className="text-gray-400">Image preview</span>
            )}
          </div>
          <div className="font-bold text-lg mt-2">{title || "Title"}</div>
          <div className="text-blue-700 font-semibold">
            {price ? `$${price}` : "Price"}
          </div>
          <div className="text-gray-500 text-sm mt-1">
            Listed just now  <br /> in Palo Alto, CA
          </div>
          <div className="mt-2 text-gray-700">
            {description || "Description"}
          </div>
          <p className="mt-2 text-base text-black font-bold">
            Seller Information
          </p>
          <p className="mt-2 text-sm text-gray-400">
            {email || "Email"}
          </p>
        </div>
      </div>
    </div>
  );
}
