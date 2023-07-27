import { CategoryProduct, Mastery, PriceRange, SortMode, SortName } from '../../consts';
import { filterSlicer} from './filter-slice';


describe('filter-scile', () => {
  const state = {
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
  it('should setSort is works', () => {
    expect(filterSlicer.reducer(state, {type: 'FILTER-PROCESS/setSort', payload: SortName.Rating})).toEqual({
      ...state,
      currentSort: {
        name: SortName.Rating,
        mode: SortMode.Increase
      }
    });
  });
  it('should setType is works', () => {
    expect(filterSlicer.reducer(state, {type: 'FILTER-PROCESS/setType' , payload: {action: 'push', filterType: 'Моментальная'}})).toEqual({
      ...state,
      filter: {
        category: null,
        level: [],
        type: ['Моментальная']
      },
    });
  });

  it('should setMode is works', () => {
    expect(filterSlicer.reducer(state, {type: 'FILTER-PROCESS/setMode', payload: SortMode.Increase})).toEqual({
      ...state,
      currentSort: {
        name: SortName.Unknown,
        mode: SortMode.Increase
      }
    });
  });

  it('should setCategory is works', () => {
    expect(filterSlicer.reducer(state, {type: 'FILTER-PROCESS/setCategory', payload: CategoryProduct.Camcorder})).toEqual({
      ...state,
      filter: {
        category: CategoryProduct.Camcorder,
        level: [],
        type: []
      },
    });
  });

  it('should setRangePrice is works', () => {
    expect(filterSlicer.reducer(state, {type: 'FILTER-PROCESS/setRangePrice', payload: {min: 100, max: 200}})).toEqual({
      ...state,
      rangePrice: {
        min: 100,
        max: 200,
      }
    });
  });

  it('should setLevel is works', () => {
    expect(filterSlicer.reducer(state, {type: 'FILTER-PROCESS/setLevel', payload: {action: 'push', filterType: Mastery.Professional}})).toEqual({
      ...state,
      filter: {
        category: null,
        level: [Mastery.Professional],
        type: []
      },
    });
  });
});
