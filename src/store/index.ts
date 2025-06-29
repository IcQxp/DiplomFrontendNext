import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 
import ratingReducer from './ratingSlice'

const store = configureStore({
    reducer: {
        user: userReducer, 
        rating: ratingReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;