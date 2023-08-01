import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { basketStore } from '../../types/state';
import { BasketPopupStatus, SlicerName } from '../../consts';
import { CardProductInfo } from '../../types/types';

const initialState : basketStore = {
  coupon: '',
  myCameras: [],
  totalPrice: 0,
  basketAddItem: BasketPopupStatus.Inactive,
  basketAddSucess: BasketPopupStatus.Inactive
};

export const basketSlicer = createSlice({
  initialState,
  name: SlicerName.BasketProcess,
  reducers: {
    addMyCameras(state, action: PayloadAction<CardProductInfo & {count?: number}>) {
      const currentItem = state.myCameras.find((el) => el.id === action.payload.id);
      if (currentItem) {
        (currentItem.count as number)++;
      } else {
        state.myCameras.push(action.payload);
      }
      const preTotal = state.myCameras.map((el) => (el.count as number) * el.price);
      state.totalPrice = preTotal.reduce((prev, el) => el + prev) ?? 0;
    },
    deleteMyCameras(state, action: PayloadAction<CardProductInfo & {mode: 'all' | 'one'}>) {
      const currentItem = state.myCameras.find((el) => el.id === action.payload.id);
      if (action.payload.mode === 'one' && currentItem) {
        (currentItem.count as number)--;
        state.totalPrice = state.totalPrice - currentItem.price;
      } else {
        const newMyCameras = state.myCameras.filter((cameras) => cameras.id !== action.payload.id);
        state.totalPrice = state.totalPrice - ((currentItem?.price as number ) * (currentItem?.count as number ));
        state.myCameras = newMyCameras;
      }
    },
    setbasketAddItem(state, action: PayloadAction<BasketPopupStatus>) {
      state.basketAddItem = action.payload;
    },
    setBasketAddSucess(state, action: PayloadAction<BasketPopupStatus>) {
      state.basketAddItem = action.payload;
    },
  }
});

export const {addMyCameras, deleteMyCameras, setbasketAddItem, setBasketAddSucess} = basketSlicer.actions;
