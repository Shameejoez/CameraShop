import type { CardProductInfo, ProductRating, PromoProduct, Review } from '../../types/types';
import { LoadingStatus, SlicerName } from '../../consts';
import { State } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';
import { takeSortMode, takeSortName } from '../site-process/site-selectors';
import { sortingsMethods } from '../../utils/utils';


export const takeCameras = ({[SlicerName.DataProcess]: SITE_DATA}: State): CardProductInfo[] => SITE_DATA.cameras;
export const takeCamera = ({[SlicerName.DataProcess]: SITE_DATA}: State): CardProductInfo | null => SITE_DATA.camera;
export const takeSimilar = ({[SlicerName.DataProcess]: SITE_DATA}: State): CardProductInfo[] => SITE_DATA.similar;
export const takeReviews = ({[SlicerName.DataProcess]: SITE_DATA}: State): Review[] => SITE_DATA.reviews;
export const takePromo = ({[SlicerName.DataProcess]: SITE_DATA}: State): PromoProduct| null => SITE_DATA.promo;
export const takeReviewSubmitStatus = ({[SlicerName.DataProcess]: SITE_DATA}: State): LoadingStatus => SITE_DATA.reviewSubmitStatus;
export const takeGetCamerasStatus = ({[SlicerName.DataProcess]: SITE_DATA}: State): LoadingStatus => SITE_DATA.getCamerasStatus;
export const takeGetCameraStatus = ({[SlicerName.DataProcess]: SITE_DATA}: State): LoadingStatus => SITE_DATA.getCameraStatus;
export const takeRatings = ({[SlicerName.DataProcess]: SITE_DATA}: State): ProductRating[] => SITE_DATA.ratingArray;


export const camerasSelector = createSelector(
  [takeCameras, takeSortName, takeSortMode],
  (cameras, sortName, sortMode) => [...cameras].sort(sortingsMethods[(String(sortName + sortMode))])
);
