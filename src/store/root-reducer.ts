import { combineReducers} from '@reduxjs/toolkit';
import { SlicerName } from '../consts';
import { dataSlicer } from './data-process/data-slice';
import { filterSlicer } from './filter-process/filter-slice';
import { basketSlicer } from './basket-process/basket-slice';


export const rootReducer = combineReducers({
  [SlicerName.DataProcess]: dataSlicer.reducer,
  [SlicerName.FilterProcces]: filterSlicer.reducer,
  [SlicerName.BasketProcess]: basketSlicer.reducer,
});
