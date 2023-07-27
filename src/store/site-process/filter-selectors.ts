import { CategoryProduct, Mastery, SlicerName, SortMode, SortName, TypeProduct } from '../../consts';
import { State } from '../../types/state';
import { RangePrice } from '../../types/types';

export const takeSortName = ({[SlicerName.FilterProcces]: SITE_DATA}: State): SortName => SITE_DATA.currentSort.name;
export const takeSortMode = ({[SlicerName.FilterProcces]: SITE_DATA}: State): SortMode => SITE_DATA.currentSort.mode;
export const takeTypes = ({[SlicerName.FilterProcces]: SITE_DATA}: State): TypeProduct[] => SITE_DATA.filter.type;
export const takeCategory = ({[SlicerName.FilterProcces]: SITE_DATA}: State): CategoryProduct | null => SITE_DATA.filter.category;
export const takeLavel = ({[SlicerName.FilterProcces]: SITE_DATA}: State): Mastery[] => SITE_DATA.filter.level;
export const takeRangePrice = ({[SlicerName.FilterProcces]: SITE_DATA}: State): RangePrice => SITE_DATA.rangePrice;
