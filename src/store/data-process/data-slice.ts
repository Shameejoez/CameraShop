import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { LoadingStatus, SlicerName } from '../../consts';
import { getCamera, getCameras, getPromo, getReviews, getSimilarCameras, postReview } from '../action';
import { DataStore } from '../../types/state';
import { setMainRating } from '../../utils';

const initialState: DataStore = {
  cameras: [],
  camera: null,
  similar: [],
  reviews: [],
  promo: null,
  reviewSubmitStatus: LoadingStatus.Unknown,
  getCamerasStatus: LoadingStatus.Unknown,
  getCameraStatus: LoadingStatus.Unknown,
  ratingArray: []
};

export const dataSlicer = createSlice({
  name: SlicerName.DataProcess,
  initialState,
  reducers: {
    setSubmitReviewStatus(state, action: PayloadAction<LoadingStatus>) {
      state.reviewSubmitStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    // получить массив продуктов
      .addCase(getCameras.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.getCamerasStatus = LoadingStatus.Fullfield;
      })
      .addCase(getCameras.pending, (state) => {
        state.getCamerasStatus = LoadingStatus.Pending;
      })
      .addCase(getCameras.rejected, (state) => {
        state.getCamerasStatus = LoadingStatus.Rejected;
      })
    // полчить продуукт по id
      .addCase(getCamera.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.getCameraStatus = LoadingStatus.Fullfield;
      })
      .addCase(getCamera.pending, (state) => {
        state.getCameraStatus = LoadingStatus.Pending;
      })
      .addCase(getCamera.rejected, (state, action) => {
        if (action.error.code !== 'ERR_BAD_REQUEST'){
          state.getCameraStatus = LoadingStatus.Rejected;
        }
      })
    // массив похожих продуктов
      .addCase(getSimilarCameras.fulfilled, (state, action) => {
        state.similar = action.payload;
      })
    // массив отзывов
      .addCase(getReviews.fulfilled, (state, action) => {
        const rating = {
          id: action.payload[0].cameraId,
          currentRating: setMainRating(action.payload.map((el) => el.rating))
        };

        const sameId = state.ratingArray.findIndex((el) => el.id === rating.id);
        sameId === -1 ? state.ratingArray.push(rating) : state.ratingArray[sameId] = rating;

        state.reviews = action.payload;
      })
    // промо продукт
      .addCase(getPromo.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
    // отправка отзыва
      .addCase(postReview.fulfilled, (state, action) => {
        const newReview = action.payload;
        state.reviews.push(newReview);
        state.reviewSubmitStatus = LoadingStatus.Fullfield;
      })
      .addCase(postReview.pending, (state) => {
        state.reviewSubmitStatus = LoadingStatus.Pending;
      })
      .addCase(postReview.rejected, (state) => {
        state.reviewSubmitStatus = LoadingStatus.Rejected;
      });
  }
});


export const {setSubmitReviewStatus} = dataSlicer.actions;
