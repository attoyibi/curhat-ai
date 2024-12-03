
import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/redux/authSlice';
import chatReducer from '../features/chat/redux/chatSlice';
import sidebarReducer from '../features/chat/redux/sidebarSlice';

const store = configureStore({
    reducer: {
        // auth: authReducer,
        chat: chatReducer,
        sidebar: sidebarReducer,
    },
});

export default store;
