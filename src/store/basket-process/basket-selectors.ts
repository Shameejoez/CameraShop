import { BasketPopupStatus, SlicerName } from '../../consts';
import { State } from '../../types/state';
import { CardProductInfo } from '../../types/types';

export const takeMyCameras = ({[SlicerName.BasketProcess]: BASKET_DATA}: State): (CardProductInfo & {count?: number})[]=> BASKET_DATA.myCameras;
export const takeTotalPrice = ({[SlicerName.BasketProcess]: BASKET_DATA}: State): number => BASKET_DATA.totalPrice;
export const takeBasketAddSucessStatus = ({[SlicerName.BasketProcess]: BASKET_DATA}: State): BasketPopupStatus => BASKET_DATA.basketAddSucess;
export const takeBasketAddItemStatus = ({[SlicerName.BasketProcess]: BASKET_DATA}: State): BasketPopupStatus => BASKET_DATA.basketAddItem;
