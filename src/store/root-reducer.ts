import { combineReducers} from '@reduxjs/toolkit';
import { SlicerName } from '../consts';
import { dataSlicer } from './data-process/data-slice';
import { siteSlicer } from './site-process/site-slice';


export const rootReducer = combineReducers({
  [SlicerName.DataProcess]: dataSlicer.reducer,
  [SlicerName.SiteProcces]: siteSlicer.reducer,

});
