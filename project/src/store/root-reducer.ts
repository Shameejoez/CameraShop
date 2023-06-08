import { combineReducers} from '@reduxjs/toolkit';
import { SlicerName } from '../consts';
import { dataSlicer } from './data-process/data-slicer';

export const rootReducer = combineReducers({
  [SlicerName.DataProcess]: dataSlicer.reducer
});
