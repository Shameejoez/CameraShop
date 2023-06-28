import { combineReducers} from '@reduxjs/toolkit';
import { SlicerName } from '../consts';
import { dataSlicer } from './data-process/data-slice';

export const rootReducer = combineReducers({
  [SlicerName.DataProcess]: dataSlicer.reducer
});
