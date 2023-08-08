import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { basketStore } from '../../types/state';
import { CuponStatus, LoadingStatus, SlicerName } from '../../consts';
import { CardProductInfo } from '../../types/types';
import { postCupon, postOrders } from '../action';

const initialState : basketStore = {
  myCameras: [],
  addedCoupon: '',
  totalPrice: 0,
  orderPostStatus: LoadingStatus.Unknown,
  discount: {
    count: 0,
    isValid: CuponStatus.Unknown
  }
};

export const basketSlicer = createSlice({
  initialState,
  name: SlicerName.BasketProcess,
  reducers: {
    // добавление товара
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
    // удаление товара
    deleteMyCameras(state, action: PayloadAction<CardProductInfo & {mode: 'all' | 'one'}>) {
      const currentItem = state.myCameras.find((el) => el.id === action.payload.id);
      if (action.payload.mode === 'one' && currentItem) {
        (currentItem.count as number)--;
        state.totalPrice = state.totalPrice - currentItem.price;
      } else {
        const newMyCameras = state.myCameras.filter((cameras) => cameras.id !== action.payload.id);
        state.totalPrice = state.totalPrice - ( ( currentItem?.price as number ) * ( currentItem?.count as number ));
        state.myCameras = newMyCameras;
      }
    },
    // изменение количества товара с помощью ручного ввода
    replaceCountMyCameras(state, action: PayloadAction<{id: CardProductInfo['id']} & {newCount: number}>) {
      const currentItem = state.myCameras.find((el) => el.id === action.payload.id);
      const indexItem = state.myCameras.indexOf(currentItem as CardProductInfo & {count?: number});
      state.myCameras[indexItem].count = action.payload.newCount;
    },
    setAddedCoupon(state, action: PayloadAction<string>) {
      state.addedCoupon = action.payload;
    },
    resetStatusCupon(state) {
      state.discount.isValid = CuponStatus.Unknown;
    },
    resetStatusOrder(state) {
      state.orderPostStatus = LoadingStatus.Unknown;
    }
  }, extraReducers: (builder) => {
    builder
    // действия с купоном
      .addCase(postCupon.fulfilled, (state, action) => {
        state.discount.count = action.payload;
        state.discount.isValid = CuponStatus.Vaild;
      })
      .addCase(postCupon.rejected, (state) => {
        state.discount.isValid = CuponStatus.Rejected;
      })
      //запрос на заказ
      .addCase(postOrders.fulfilled, (state) => {
        state.orderPostStatus = LoadingStatus.Fullfield;
        state.myCameras = [];
        state.addedCoupon = '';
      })
      .addCase(postOrders.rejected, (state) => {
        state.orderPostStatus = LoadingStatus.Rejected;
      });
  }
});

export const {addMyCameras, deleteMyCameras, replaceCountMyCameras, resetStatusCupon, resetStatusOrder, setAddedCoupon} = basketSlicer.actions;
