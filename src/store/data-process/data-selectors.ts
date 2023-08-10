import type { CardProductInfo, ProductRating, PromoProduct, Review } from '../../types/types';
import { LoadingStatus, SlicerName } from '../../consts';
import { State } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';
import { takeCategory, takeLavel, takeRangePrice, takeSortMode, takeSortName, takeTypes } from '../filter-process/filter-selectors';
import { sortingsMethods } from '../../utils/utils';
import { filterCategory, filterLevel, filterTypes } from '../../utils/filters';

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
  [takeCameras, takeRatings, takeSortName, takeSortMode, takeCategory, takeTypes, takeLavel, takeRangePrice],
  (cameras, ratings, sortName, sortMode, category, types, levels) => {
    const newCameras = cameras.map((camera) => ({...camera, rating: Math.ceil(ratings.filter((el) => el.id === camera.id)[0]?.currentRating)}));

    return filterLevel(filterTypes(filterCategory([...newCameras], category), types), levels)
      .sort(sortingsMethods[(String(sortName + sortMode))]);
  }
);
