import { createAsyncThunk } from '@reduxjs/toolkit';
import {AxiosError, AxiosInstance} from 'axios';
import { CardProductInfo, Order, PromoProduct, Review, sendRewiew } from '../types/types';
import { ApiRoutes } from '../consts';

type Extra = {
    api: AxiosInstance;
};


const Action = {
  GET_CAMERAS: 'get/cameras',
  GET_CAMERA: 'get/camera',
  GET_SIMILAR_CAMERAS: 'get/similarCameras',
  GET_PROMO: 'get/promo',
  GET_REVIEWS: 'get/reviwes',
  POST_REVIEW: 'post/review',
  COUPON: 'post/coupon',
  POST_ORDER: 'post/order'

};

// запрос каталога товарв
export const getCameras = createAsyncThunk<CardProductInfo[], undefined, {extra: Extra}>(
  Action.GET_CAMERAS,
  async(_, {extra}) => {
    const {api} = extra;

    try {
      const {data} = await api.get<CardProductInfo[]>(ApiRoutes.cameras);
      return data;

    } catch(e) {
      const axiosError = e as AxiosError;

      return Promise.reject(axiosError);
    }
  }
);

// запрос одного товара
export const getCamera = createAsyncThunk<CardProductInfo, CardProductInfo['id'], {extra: Extra}>(
  Action.GET_CAMERA,
  async(id, {extra}) => {
    const {api} = extra;
    try {
      const {data} = await api.get<CardProductInfo>(`${ApiRoutes.cameras}/${id}`);

      return data;
    } catch (e) {
      const axiosError = e as AxiosError;

      if(axiosError.response?.status === 404) {
        window.location.replace('/404');
      }


      return Promise.reject(axiosError);
    }


  }
);
// запрос похожих товаров
export const getSimilarCameras = createAsyncThunk<CardProductInfo[], CardProductInfo['id'], {extra: Extra}>(
  Action.GET_SIMILAR_CAMERAS,
  async(id, {extra}) => {
    const {api} = extra;
    const {data} = await api.get<CardProductInfo[]>(`${ApiRoutes.cameras}/${id}${ApiRoutes.similar}`);

    return data;

  }
);

// получить комментарии о товаре
export const getReviews = createAsyncThunk<Review[], CardProductInfo['id'], {extra: Extra}>(
  Action.GET_REVIEWS,
  async(id, {extra}) => {
    const {api} = extra;
    const {data} = await api.get<Review[]>(`${ApiRoutes.cameras}/${id}${ApiRoutes.reviews}`);

    return data;

  }
);

// оставить комментарий
export const postReview = createAsyncThunk<Review, sendRewiew, {extra: Extra}>(
  Action.POST_REVIEW,

  async({advantage, cameraId, disadvantage, rating, review, userName}, {extra}) => {

    const currentReview: sendRewiew = {advantage, cameraId, disadvantage, rating, review, userName};
    const {api} = extra;

    const {data} = await api.post<Review>(ApiRoutes.reviews, currentReview);

    return data;
  }
);

//купон на скидку
export const postCupon = createAsyncThunk<number, string, {extra: Extra}>(
  Action.COUPON,

  async(coupon, {extra}) => {

    const {api} = extra;
    const {data} = await api.post<number>(ApiRoutes.coupon, coupon);
    return data;
  }
);

// запрос на заказ
export const postOrders = createAsyncThunk<undefined, Order, {extra: Extra}>(
  Action.POST_ORDER,

  async(order, {extra}) => {

    const {api} = extra;
    const {data} = await api.post<undefined>(ApiRoutes.order, order);

    return data;
  }
);

// запрос промо товара

export const getPromo = createAsyncThunk<PromoProduct, undefined, {extra: Extra}>(
  Action.GET_PROMO,

  async(_, {extra}) => {

    const {api} = extra;
    const {data} = await api.get<PromoProduct>('/promo');

    return data;
  }
);

