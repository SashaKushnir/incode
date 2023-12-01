import { createSlice } from '@reduxjs/toolkit';

interface CharactersState {
}

const initialCharactersState: CharactersState = {};

export const charactersSlice = createSlice({
  name: 'charactersSlice',
  initialState: initialCharactersState,
  reducers: {},
  extraReducers: builder => {
    // builder
    // 	.addCase(checkZipCode.pending, state => {
    // 	})
    // 	.addCase(checkZipCode.fulfilled, (state, action) => {
    // 		})
    // 	.addCase(checkZipCode.rejected, state => {
    // 	})
  },
});

export const {} = charactersSlice.actions;

