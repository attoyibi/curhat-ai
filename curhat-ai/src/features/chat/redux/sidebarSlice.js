import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../../lib/supabaseClient';

// Async thunk to fetch user sessions
export const fetchUserSessions = createAsyncThunk(
    'sidebar/fetchUserSessions',
    async (_, { rejectWithValue }) => {
        try {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) throw sessionError;

            if (!session) throw new Error('No user session found.');

            const { data, error } = await supabase
                .from('sessions')
                .select('*')
                .eq('user_id', session.user.id)
                .order('session_start', { ascending: false });;

            if (error) throw error;

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isSidebarOpen: false,
        userSessions: [
            {
                "session_end": null,
                "session_id": "default",
                "session_start": "default",
                "topic": "Loading . . .",
                "user_id": "default"
            },
        ],
        isLoading: false,
        isShowUserSettings: false,
        error: null,
    },
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        closeSidebar: (state) => {
            state.isSidebarOpen = false;
        },
        addUserSessions: (state, payload) => {
            // state.userSessions = payload.data;
        },
        clearUserSessions: (state) => {
            state.userSessions = []; // Clear the session data
        },
        clearUserSettingComponent: (state) => {
            state.isShowUserSettings = false; // Clear the session data
        },
        toggleUserSettingsReducer: (state) => {
            state.isShowUserSettings = !state.isShowUserSettings; // Clear the session data
        },
        removeUserSessionFromState: (state, action) => {
            state.userSessions = state.userSessions.filter(session => session.session_id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserSessions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserSessions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userSessions = action.payload;
            })
            .addCase(fetchUserSessions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { toggleSidebar, closeSidebar, addUserSessions, clearUserSessions, clearUserSettingComponent, toggleUserSettingsReducer, removeUserSessionFromState } = sidebarSlice.actions;

export default sidebarSlice.reducer;
