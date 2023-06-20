import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { ReviewSubmitStatus, SlicerName } from '../../consts';
import { getCamera, getCameras, getPromo, getReviews, getSimilarCameras, postReview } from '../action';
import { DataStore } from '../../types/state';


const initialState: DataStore = {
  cameras: [],
  camera: null,
  similar: [],
  reviews: [],
  promo: null,
  reviewSubmitStatus: ReviewSubmitStatus.Unknown
};


export const dataSlicer = createSlice({
  name: SlicerName.DataProcess,
  initialState,
  reducers: {
    setSubmitReviewStatus(state, action: PayloadAction<ReviewSubmitStatus>) {
      state.reviewSubmitStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    // получить массив продуктов
      .addCase(getCameras.fulfilled, (state, action) => {
        state.cameras = action.payload;
      })
    // полчить продуукт по id
      .addCase(getCamera.fulfilled, (state, action) => {
        state.camera = action.payload;
      })
    // массив похожих продуктов
      .addCase(getSimilarCameras.fulfilled, (state, action) => {
        state.similar = action.payload;
      })
    // массив отзывов
      .addCase(getReviews.fulfilled, (state, action) => {
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
        state.reviewSubmitStatus = ReviewSubmitStatus.Fullfield;
      })
      .addCase(postReview.pending, (state) => {
        state.reviewSubmitStatus = ReviewSubmitStatus.Pending;
      })
      .addCase(postReview.rejected, (state) => {
        state.reviewSubmitStatus = ReviewSubmitStatus.Rejected;
      });
  }
});


export const {setSubmitReviewStatus} = dataSlicer.actions;
