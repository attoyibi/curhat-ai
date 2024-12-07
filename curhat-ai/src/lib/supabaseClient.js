// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Mengambil nilai dari variabel lingkungan
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inisialisasi Supabase client hanya sekali
const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey);
// Ekspor instance Supabase agar bisa digunakan di seluruh aplikasi
export default supabase;