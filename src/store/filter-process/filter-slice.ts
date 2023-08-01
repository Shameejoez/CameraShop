import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CategoryProduct, Mastery, PriceRange, SlicerName, SortMode, SortName, TypeProduct } from '../../consts';
import { siteStore } from '../../types/state';
import { RangePrice, SetFilter } from '../../types/types';

const initialState: siteStore = {
  currentSort: {
    name: SortName.Unknown,
    mode: SortMode.Increase
  },
  filter: {
    category: null,
    level: [],
    type: []
  },
  rangePrice: {
    min: PriceRange.Min,
    max: PriceRange.Max,
  }
};

export const filterSlicer = createSlice({
  name: SlicerName.FilterProcces,
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortName>) {
      state.currentSort.name = action.payload;
    },
    setMode(state, action: PayloadAction<SortMode>) {
      state.currentSort.mode = action.payload;
    },
    setCategory(state, action: PayloadAction<CategoryProduct | null>) {
      state.filter.category = action.payload;
    },
    setLevel(state, action: PayloadAction<SetFilter>) {
      let newLevels = [];
      if (action.payload.action === 'push' && !state.filter.level.includes(action.payload.filterType as Mastery)) {
        state.filter.level.push(action.payload.filterType as Mastery);
      }
      if (action.payload.action === 'unshift') {
        newLevels = state.filter.level.filter((el) => el !== action.payload.filterType);
        state.filter.level = newLevels;
      }
    },
    setType(state, action: PayloadAction<SetFilter>) {
      let newTypes = [];
      if (action.payload.action === 'push' && !state.filter.type.includes(action.payload.filterType as TypeProduct)) {
        state.filter.type.push(action.payload.filterType as TypeProduct);
      }
      if (action.payload.action === 'unshift') {
        newTypes = state.filter.type.filter((el) => el !== action.payload.filterType);
        state.filter.type = newTypes;
      }
    },
    setRangePrice(state, action: PayloadAction<RangePrice>) {
      state.rangePrice.min = action.payload.min;
      state.rangePrice.max = action.payload.max;
    }
  }
});

export const {setSort, setMode, setLevel, setType, setCategory, setRangePrice} = filterSlicer.actions;

