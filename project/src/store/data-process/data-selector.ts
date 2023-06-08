import type { CardProductInfo, PromoProduct, Review } from '../../types/types';
import { SlicerName } from '../../consts';
import { State } from '../../types/state';


export const takeCameras = ({[SlicerName.DataProcess]: SITE_DATA}: State): CardProductInfo[] => SITE_DATA.cameras;
export const takeCamera = ({[SlicerName.DataProcess]: SITE_DATA}: State): CardProductInfo | null => SITE_DATA.camera;
export const takeSimilar = ({[SlicerName.DataProcess]: SITE_DATA}: State): CardProductInfo[] => SITE_DATA.similar;
export const takeReviews = ({[SlicerName.DataProcess]: SITE_DATA}: State): Review[] => SITE_DATA.reviews;
export const takePromo = ({[SlicerName.DataProcess]: SITE_DATA}: State): PromoProduct| null => SITE_DATA.promo;
