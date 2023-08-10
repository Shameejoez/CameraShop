import { CategoryProduct, CouponStatus, LoadingStatus, Mastery, TypeProduct } from '../../consts';
import { CardProductInfo } from '../../types/types';
import { postCoupon, postOrders } from '../action';
import { basketSlicer } from './basket-slice';

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
  price: 18,
  reviewCount: 8,
  type: TypeProduct.Film,
  vendorCode: 'GGGSSSBBBBB133313',
}];

describe('basket-slice', () => {
  const state = {
    myCameras: [],
    addedCoupon: '',
    totalPrice: 0,
    orderPostStatus: LoadingStatus.Unknown,
    discount: {
      count: 0,
      isValid: CouponStatus.Unknown
    }
  };

  it('should addMyCameras is works', () => {
    expect(basketSlicer.reducer(state, {type: 'BASKET-PROCESS/addMyCameras', payload: {...productCards[0], count: 2}})).toEqual({
      ...state,
      myCameras: [{...productCards[0], count: 2}],
      totalPrice: 36
    });
  });


  describe('deleteMyCameras', () => {
    const thisState = {
      myCameras: [{...productCards[0], count: 2}],
      addedCoupon: '',
      totalPrice: 36,
      orderPostStatus: LoadingStatus.Unknown,
      discount: {
        count: 0,
        isValid: CouponStatus.Unknown
      }
    };
    it('should deleteMyCameras', () => {
      expect(basketSlicer.reducer(thisState, {type: 'BASKET-PROCESS/deleteMyCameras', payload: {...productCards[0], mode: 'all'}})).toEqual({
        ...thisState,
        myCameras: [],
        totalPrice: 0
      });
    });
  });


  describe('replaceCountMyCameras', () => {
    const thisState = {
      myCameras: [productCards[0]],
      addedCoupon: '',
      totalPrice: 0,
      orderPostStatus: LoadingStatus.Unknown,
      discount: {
        count: 0,
        isValid: CouponStatus.Unknown
      }
    };

    it('should replaceCountMyCameras is works', () => {

      expect(basketSlicer.reducer(thisState, {type: 'BASKET-PROCESS/replaceCountMyCameras', payload: {id: productCards[0].id, newCount: 5}})).toEqual({
        ...thisState,
        myCameras: [{...productCards[0], count: 5}],
        totalPrice: 5 * 18,
      });
    });
  });

  it('should resetStatusCoupon is works', () => {
    expect(basketSlicer.reducer(state, {type: 'BASKET-PROCESS/resetStatusCoupon'})).toEqual({
      ...state,
      discount: {
        isValid: CouponStatus.Unknown,
        count: 0
      }
    });
  });
  it('should resetStatusOrder is works', () => {
    expect(basketSlicer.reducer(state, {type: 'BASKET-PROCESS/resetStatusOrder'})).toEqual({
      ...state,
      orderPostStatus: LoadingStatus.Unknown
    });
  });

  it('should setAddedCoupon is works', () => {
    expect(basketSlicer.reducer(state, {type: 'BASKET-PROCESS/setAddedCoupon', payload: 'camera-333'})).toEqual({
      ...state,
      addedCoupon: 'camera-333'
    });
  });

  it('should postOrder is works', () => {
    expect(basketSlicer.reducer(state, {type: postOrders.fulfilled, payload: {id: productCards[0].id, coupon: 'camera-333'} })).toEqual({
      ...state,
      orderPostStatus: LoadingStatus.Fullfield,
    });

    expect(basketSlicer.reducer(state, {type: postOrders.rejected, payload: {id: productCards[0].id, coupon: 'camera-333'} })).toEqual({
      ...state,
      orderPostStatus: LoadingStatus.Rejected,
    });
  });

  it('should postCoupon is works', () => {
    expect(basketSlicer.reducer(state, {type: postCoupon.fulfilled, payload: 'camera-333' })).toEqual({
      ...state,

      discount: {
        count: 'camera-333',
        isValid: CouponStatus.Vaild
      }
    });
  });
});
