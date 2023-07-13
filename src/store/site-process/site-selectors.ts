import { SlicerName, SortMode, SortName } from '../../consts';
import { State } from '../../types/state';

export const takeSortName = ({[SlicerName.SiteProcces]: SITE_DATA}: State): SortName => SITE_DATA.currentSort.name;
export const takeSortMode = ({[SlicerName.SiteProcces]: SITE_DATA}: State): SortMode => SITE_DATA.currentSort.mode;
