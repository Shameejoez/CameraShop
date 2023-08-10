import { CategoryProduct, CouponStatus, LoadingStatus, Mastery, SortMode, SortName, TypeProduct } from '../consts';
import { store} from '../store';
import { CardProductInfo, ProductRating, PromoProduct, Review } from './types';

export type State = ReturnType <typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type DataStore = {
    cameras: CardProductInfo[];
    camera: CardProductInfo | null;
    similar: CardProductInfo[];
    reviews: Review[];
    promo: PromoProduct | null;
    reviewSubmitStatus: LoadingStatus;
    getCamerasStatus: LoadingStatus;
    getCameraStatus: LoadingStatus;
    ratingArray: ProductRating[];
}

export type siteStore = {
    currentSort: {
        name: SortName;
        mode: SortMode;
    };
    filter: {
        category: CategoryProduct | null;
        type: TypeProduct[];
        level: Mastery[];
    };
    rangePrice: {
        min: number | null;
        max: number | null;
    };
}

export type basketStore = {
    myCameras: (CardProductInfo & {count?: number})[];
    addedCoupon: string;
    totalPrice: number;
    orderPostStatus: LoadingStatus;
    discount:{
        count: number;
        isValid: CouponStatus;
        };
    };
