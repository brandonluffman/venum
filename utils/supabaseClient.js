import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const storageUrl = 'https://kuiqsgbpmuyoefnrmqvp.supabase.co/storage/v1/object/sign';
const storageKey = 'ff698868653f65b665e4ee172844c4f1';
const storage = createClient(storageUrl, storageKey);

export { supabase, storage }
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);