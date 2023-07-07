import { LoadingStatus } from '../consts';
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
