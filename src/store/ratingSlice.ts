// src/features/rating/ratingSlice.ts
import { NivoDefaultData, RatingResponse } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RatingState {
  data: RatingResponse | null;
}

const initialState: RatingState = {
  data: null,
};

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<RatingResponse>) => {
      state.data = action.payload;
    },
    clearRating: (state) => {
      state.data = null;
    },
  },
});

export const { setRating, clearRating } = ratingSlice.actions;

export default ratingSlice.reducer;
