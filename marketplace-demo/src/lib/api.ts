import { createClient } from '@supabase/supabase-js';

// ✅ 1️⃣ Create Supabase client with environment vars
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ 2️⃣ Fetch all listings
export async function fetchListings(params?: Record<string, string>) {
  let query = supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (params?.category) query = query.eq('category', params.category);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// ✅ 3️⃣ Create a new listing
export async function createListing(data: Record<string, unknown>) {
  const { data: result, error } = await supabase
    .from('listings')
    .insert([data])
    .select();

  if (error) throw error;
  return result?.[0];
}

// ✅ 4️⃣ Fetch a single listing by ID
export async function fetchListingById(id: string) {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// ✅✅✅ 5️⃣ Upload image to Storage using Supabase client
export async function uploadImage(file: File) {
  const filePath = `${Date.now()}-${file.name}`;

  console.log('Uploading to bucket: listing-images');
  console.log('File path:', filePath);
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Supabase ANON KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const { data, error } = await supabase.storage
    .from('listing-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Upload error:', JSON.stringify(error, null, 2));
    throw error;
  }

  console.log('Upload successful:', data);

  // ✅ Return public URL
  const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/listing-images/${filePath}`;
  return { url: publicUrl };
}

export async function sendMessage(data: { listing_id: string; buyer_email: string; message: string; seller_email?: string }) {
  const { data: result, error } = await supabase.from('messages').insert([data]);
  if (error) throw error;
  return result;
}
