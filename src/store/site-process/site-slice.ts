import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SlicerName, SortMode, SortName } from '../../consts';
import { siteStore } from '../../types/state';

const initialState: siteStore = {
  currentSort: {
    name: SortName.Unknown,
    mode: SortMode.Increase
  },
  filter: {
    category: null,
    level: [],
    type: []
  }
};


export const siteSlicer = createSlice({
  name: SlicerName.SiteProcces,
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortName>) {
      state.currentSort.name = action.payload;
    },
    setMode(state, action: PayloadAction<SortMode>) {
      state.currentSort.mode = action.payload;
    },
  }
});


export const { setSort, setMode } = siteSlicer.actions;

