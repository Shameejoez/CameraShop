import { CategoryProduct, Mastery, SlicerName, SortMode, SortName, TypeProduct } from '../../consts';
import { State } from '../../types/state';
import { RangePrice } from '../../types/types';

export const takeSortName = ({[SlicerName.FilterProcces]: FILTER_DATA}: State): SortName => FILTER_DATA.currentSort.name;
export const takeSortMode = ({[SlicerName.FilterProcces]: FILTER_DATA}: State): SortMode => FILTER_DATA.currentSort.mode;
export const takeTypes = ({[SlicerName.FilterProcces]: FILTER_DATA}: State): TypeProduct[] => FILTER_DATA.filter.type;
export const takeCategory = ({[SlicerName.FilterProcces]: FILTER_DATA}: State): CategoryProduct | null => FILTER_DATA.filter.category;
export const takeLavel = ({[SlicerName.FilterProcces]: FILTER_DATA}: State): Mastery[] => FILTER_DATA.filter.level;
export const takeRangePrice = ({[SlicerName.FilterProcces]: FILTER_DATA}: State): RangePrice => FILTER_DATA.rangePrice;
