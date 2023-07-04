import { CategoryProduct, LoadingStatus, Mastery, TypeProduct } from '../../consts';
import { CardProductInfo, PromoProduct, Review } from '../../types/types';
import { getCamera, getCameras, getPromo, getReviews, getSimilarCameras, postReview } from '../action';
import { dataSlicer } from './data-slice';


const productCards: CardProductInfo[] = [{
  category: CategoryProduct.Camcorder,
  description: 'ВААААУУУ ЧТО ЗА МАШИНА, ОЙ КАМЕРА',
  id: 88,
  level: Mastery.Professional,
  name: 'Сумашедший китайский дракон',
  previewImg: 'ggg/sss.img',
  previewImg2x: 'ggg/sss.img',
  previewImgWebp: 'ggg/sss.img',
  previewImgWebp2x: 'ggg/sss.img',
  price: 18888888878,
  reviewCount: 8,
  type: TypeProduct.Film,
  vendorCode: 'GGGSSSBBBBB133313',
}];

const promo: PromoProduct = {
  id: 88,
  name: 'Сумасшедший китайски дракон',
  previewImg: 'ggg/sss.img',
  previewImg2x: 'ggg/sss.img',
  previewImgWebp: 'ggg/sss.img',
  previewImgWebp2x: 'ggg/sss.img',
};


const review: Review [] = [{
  advantage: 'Очень красивая',
  disadvantage: 'Нельзя колоть орехи',
  cameraId: 88,
  createAt: '18.06.1901',
  id: '123213123fdfsdfsfsd',
  rating: 4,
  review: 'Хотель расколоть грецкий орех - расколол камеру',
  userName: 'Михаил'
}];

describe('Reduser: data-slicer', () => {
// массив продуктов
  it('should return fetch cameras', () => {
    const state = {
      cameras: [],
      camera: null,
      similar: [],
      reviews: [],
      promo: null,
      reviewSubmitStatus: LoadingStatus.Unknown,
      getCameraStatus: LoadingStatus.Unknown,
      getCamerasStatus: LoadingStatus.Unknown,
    };
    expect(dataSlicer.reducer(state, {type: getCameras.fulfilled.type, payload: productCards}))
      .toEqual({...state,
        cameras: productCards,
        getCamerasStatus: LoadingStatus.Fullfield
      });
    expect(dataSlicer.reducer(state, {type: getCameras.pending.type, payload: []}))
      .toEqual({...state,
        cameras: [],
        getCamerasStatus: LoadingStatus.Pending
      });
    expect(dataSlicer.reducer(state, {type: getCameras.rejected.type, payload: []}))
      .toEqual({...state,
        cameras: [],
        getCamerasStatus: LoadingStatus.Rejected
      });

  });
  // один продукт
  it('should return fetch camera', () => {
    const state = {
      cameras: [],
      camera: null,
      similar: [],
      reviews: [],
      promo: null,
      reviewSubmitStatus: LoadingStatus.Unknown,
      getCameraStatus: LoadingStatus.Unknown,
      getCamerasStatus: LoadingStatus.Unknown,
    };

    expect(dataSlicer.reducer(state, {type: getCamera.fulfilled.type, payload: productCards[0]}))
      .toEqual({...state,
        camera: productCards[0],
        getCameraStatus: LoadingStatus.Fullfield,
      });
    expect(dataSlicer.reducer(state, {type: getCamera.pending.type, payload: []}))
      .toEqual({...state,
        camera: null,
        getCameraStatus: LoadingStatus.Pending,
      });
    expect(dataSlicer.reducer(state, {type: getCamera.rejected.type, payload: []}))
      .toEqual({...state,
        camera: null,
        getCameraStatus: LoadingStatus.Rejected,
      });
  });
  // массивс похожих продуктов
  it('should return fetch similar', () => {
    const state = {
      cameras: [],
      camera: null,
      similar: [],
      reviews: [],
      promo: null,
      reviewSubmitStatus: LoadingStatus.Unknown,
      getCameraStatus: LoadingStatus.Unknown,
      getCamerasStatus: LoadingStatus.Unknown,
    };

    expect(dataSlicer.reducer(state, {type: getSimilarCameras.fulfilled.type, payload: productCards}))
      .toEqual({...state,
        similar: productCards
      });
  });
  // промо продукт
  it('should return fetch promo camera', () => {
    const state = {
      cameras: [],
      camera: null,
      similar: [],
      reviews: [],
      promo: null,
      reviewSubmitStatus: LoadingStatus.Unknown,
      getCameraStatus: LoadingStatus.Unknown,
      getCamerasStatus: LoadingStatus.Unknown,
    };

    expect(dataSlicer.reducer(state, {type: getPromo.fulfilled.type, payload: promo}))
      .toEqual({...state,
        promo: promo
      });
  });
  // массив комментариев
  it('should return fetch reviews', () => {
    const state = {
      cameras: [],
      camera: null,
      similar: [],
      reviews: [],
      promo: null,
      reviewSubmitStatus: LoadingStatus.Unknown,
      getCameraStatus: LoadingStatus.Unknown,
      getCamerasStatus: LoadingStatus.Unknown,
    };

    expect(dataSlicer.reducer(state, {type:getReviews.fulfilled.type, payload: review}))
      .toEqual({...state,
        reviews: review
      });
  });
  // опубликовать комментарий
  it('should return fetch postReview', () => {
    const state = {
      cameras: [],
      camera: null,
      similar: [],
      reviews: [] as Review[] ,
      promo: null,
      reviewSubmitStatus: LoadingStatus.Unknown,
      getCameraStatus: LoadingStatus.Unknown,
      getCamerasStatus: LoadingStatus.Unknown,
    };

    expect(dataSlicer.reducer(state, {type: postReview.fulfilled.type, payload: review[0], }))
      .toEqual({...state,
        reviews: [review[0]],
        reviewSubmitStatus: LoadingStatus.Fullfield,
      });
    expect(dataSlicer.reducer(state, {type: postReview.pending.type}))
      .toEqual({...state,
        reviewSubmitStatus: LoadingStatus.Pending
      });
    expect(dataSlicer.reducer(state, {type: postReview.rejected.type}))
      .toEqual({...state,
        reviewSubmitStatus: LoadingStatus.Rejected
      });
  });
});
