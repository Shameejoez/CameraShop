import { combineReducers} from '@reduxjs/toolkit';
import { SlicerName } from '../consts';
import { dataSlicer } from './data-process/data-slice';
import { filterSlicer } from './site-process/filter-slice';


export const rootReducer = combineReducers({
  [SlicerName.DataProcess]: dataSlicer.reducer,
  [SlicerName.FilterProcces]: filterSlicer.reducer,

});
