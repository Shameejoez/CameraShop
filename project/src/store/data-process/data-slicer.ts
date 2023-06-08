import {createSlice} from '@reduxjs/toolkit';
import { SlicerName } from '../../consts';
import { getCamera, getCameras, getPromo, getReviews, getSimilarCameras } from '../action';
import { DataStore } from '../../types/state';


const initialState: DataStore = {
  cameras: [],
  camera: null,
  similar: [],
  reviews: [],
  promo: null
};


export const dataSlicer = createSlice({
  name: SlicerName.DataProcess,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCameras.fulfilled, (state, action) => {
        state.cameras = action.payload;
      })
      .addCase(getCamera.fulfilled, (state, action) => {
        state.camera = action.payload;
      })
      .addCase(getSimilarCameras.fulfilled, (state, action) => {
        state.similar = action.payload;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(getPromo.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  }
});
