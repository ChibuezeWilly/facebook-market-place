import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function GET(req: Request, context: any) {
  const { id } = context.params;
  const { data, error } = await supabase.from('listings').select('*').eq('id', id).single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
} 