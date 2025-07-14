"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from '@/store/useStore';
import { fetchListingById, sendMessage } from '@/lib/api';

type Listing = {
  id: string;
  title: string;
  price: number;
  description: string;
  seller: string;
  image_url: string;
  location?: string;
};

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [item, setItem] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const email = useStore((state) => state.email);
  const setEmail = useStore((state) => state.setEmail);
  const message = useStore((state) => state.message);
  const setMessage = useStore((state) => state.setMessage);

  // Fetch listing data from API
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetchListingById(id)
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load listing details.');
        setLoading(false);
        console.error('Error fetching listing:', err);
      });
  }, [id]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    
    try {
      await sendMessage({
        listing_id: id,
        buyer_email: email,           // the sender's email
        message,
        seller_email: item?.seller || '' // the seller's email
      });
      setSent(true);
      setMessage(''); // Clear message after sending
      
      // Navigate back to marketplace after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="px-3 md:px-10 lg:px-16 py-5">
        <div className="text-center py-20 text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="px-3 md:px-10 lg:px-16 py-5">
        <div className="text-center py-20 text-red-500">
          {error || 'Listing not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 md:px-10 lg:px-16 py-5">
      <Link className="flex items-center gap-3 mb-3" href={'/category/electronics'}>
        <div className="bg-[#1877F2] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
          F
        </div>
        <span className="font-bold text-xl text-[#1877F2]">Marketplace</span>
      </Link>
      <div className="flex flex-col md:flex-row gap-8 ">
        <div className="flex-1 flex items-center justify-center h-screen">
          <Image src={item.image_url || "https://placehold.co/600x400/EEE/CCC?text=Item"} alt={item.title} className="rounded-lg w-full max-w-3xl object-contain bg-gray-100 h-full" width={600} height={400} />
        </div>
        <div className="flex w-80 flex flex-col">
          <label className="font-bold mb-1" htmlFor="item-title">Item Name</label>
          <div id="item-title" className="text-2xl font-bold mb-2">{item.title}</div>
          <label className="font-bold mb-1" htmlFor="item-price">Price</label>
          <div id="item-price" className="font-bold text-black text-xl mb-2">${item.price}</div>
          <label className="font-bold mb-1" htmlFor="item-description">Description</label>
          <div id="item-description" className="text-gray-500 mb-4 text-sm w-[40%]">{item.description}</div>
          <label className="font-bold mb-1" htmlFor="item-seller">Seller Information</label>
          <div id="item-seller" className="mb-4">{item.seller}</div>
          <form className="flex flex-col gap-2" onSubmit={handleSend}>
            <label className="font-bold" htmlFor="email">Your Email</label>
            <input
              id="email"
              type="email"
              className="border rounded px-3 py-2"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <label className="font-bold" htmlFor="message">Your Message</label>
            <textarea
              id="message"
              className="border rounded px-3 py-4"
              placeholder="Your message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            {!sent ? (
              <button 
                type="submit" 
                disabled={sending}
                className="bg-blue-600 text-white rounded py-2 mt-2 disabled:bg-gray-400"
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
            ) : (
              <div className="bg-green-200 text-green-700 font-semibold rounded py-2 px-3 mt-2">
                Message sent successfully, the seller will receive an email notification
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
