import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Breed {
  id: string;
  name: string;
  origin: string;
  description: string;
  life_span: string;
  reference_image_id: string;
}

interface CatState {
  breeds: Breed[];
  selectedBreed: Breed | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CatState = {
  breeds: [],
  selectedBreed: null,
  status: 'idle',
  error: null,
};

const API_KEY = 'live_vfgqBiyMec1Wc6JEnQLR6YO8cdLXOSdVmLiY6z9QqBGehmXICYdvubzJR2oexhE9';
const API_URL = 'https://api.thecatapi.com/v1/breeds';

export const fetchBreeds = createAsyncThunk<Breed[]>('cats/fetchBreeds', async () => {
  const response = await axios.get(API_URL, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  return response.data;
});

export const fetchBreedDetails = createAsyncThunk<Breed, string>('cats/fetchBreedDetails', async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  return response.data;
});

const catSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    selectBreed: (state, action: PayloadAction<Breed>) => {
      state.selectedBreed = action.payload;
      state.status = 'idle'; // Reset status when a breed is selected
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreeds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.breeds = action.payload;
      })
      .addCase(fetchBreeds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchBreedDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBreedDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedBreed = action.payload;
      })
      .addCase(fetchBreedDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { selectBreed } = catSlice.actions;

export default catSlice.reducer;
