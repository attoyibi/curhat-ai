// src/features/chat/services/chatService.js
import supabase from '../../../lib/supabaseClient';

// Fungsi untuk fetch chat sessions
// export const getChatSession = () => {
//     const { data, error } = supabase.from('session').order('session_start', { ascending: false }); // Urutkan dari terbaru ke terlama;
//     if (error) throw error;
//     return data;
// };

// export const getChatSession = async () => {
//     const { data, error } = await supabase
//         .from('session')
//         .select('*')
//         .order('session_start', { ascending: false }); // Mengurutkan berdasarkan session_start secara menurun

//     if (error) throw error;
//     return data;
// };

export const getChatSession = async () => {
    const { data, error } = await supabase
        .from('session')
        .select('*', { count: 'exact', head: false }) // Hindari cache
        .order('session_start', { ascending: false });

    if (error) throw error;
    return data;
};


// Fungsi untuk fetch chat messages berdasarkan sessionId
export const getChatMessageBySession = (sessionId) => {
    const { data, error } = supabase.from('messages').select('*').eq('session_id', sessionId);
    if (error) throw error;
    return data;
};

