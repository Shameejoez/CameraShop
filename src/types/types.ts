import { CategoryProduct, Mastery, TypeProduct } from '../consts';

export type CardProductInfo = {
    id: number;
    name: string;
    vendorCode: string;
    type: TypeProduct;
    category: CategoryProduct ;
    description: string;
    level: Mastery ;
    price: number;
    reviewCount: number;
    previewImg: string;
    previewImg2x: string;
    previewImgWebp: string;
    previewImgWebp2x: string;
    rating?: null | number;
}

export type ProductRating = {
    id: number;
    currentRating: number;
}

export type Review = {
    id: string;
    createAt: string;
    cameraId: number;
    userName: string;
    advantage: string;
    disadvantage: string;
    review: string;
    rating: number;
}

export type Order = {
    camerasIds: CardProductInfo['id'] [];
}

export type sendRewiew = Omit <Review, 'id' | 'createAt'>;
export type PromoProduct = Pick<CardProductInfo, 'id' | 'name' | 'previewImg' | 'previewImg2x' | 'previewImgWebp' | 'previewImgWebp2x'>
