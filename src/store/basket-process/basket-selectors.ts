import { CuponStatus, LoadingStatus, SlicerName } from '../../consts';
import { State } from '../../types/state';
import { CardProductInfo } from '../../types/types';

export const takeMyCameras = ({[SlicerName.BasketProcess]: BASKET_DATA}: State): (CardProductInfo & {count?: number})[]=> BASKET_DATA.myCameras;
export const takeTotalPrice = ({[SlicerName.BasketProcess]: BASKET_DATA}: State): number => BASKET_DATA.totalPrice;
export const takeDiscount = ({[SlicerName.BasketProcess]: BASKET_DATA}: State): number => BASKET_DATA.discount.count;
export const takeCuponStatus = ({[SlicerName.BasketProcess]: BASKET_DATA}: State): CuponStatus => BASKET_DATA.discount.isValid;
export const takeAddedCoupon = ({[SlicerName.BasketProcess]: BASKET_DATA}: State): string => BASKET_DATA.addedCoupon;
export const takeOrderStatus = ({[SlicerName.BasketProcess]: BASKET_DATA}: State): LoadingStatus => BASKET_DATA.orderPostStatus;
