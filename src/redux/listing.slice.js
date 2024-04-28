import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Config} from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  listingLoader: null,
  listingData: null,
  categoryData: null,
  categoryLoading: null,
  categoryListLoading: null,
  searchLoading: null,
  currentPage: null,
  paginationLoading: null,
};

export const ListingApi = createAsyncThunk(
  'main/ListingApi',
  async (params, thunkAPI) => {
   // console.log('url', `${Config.LISTING_API}skip=1`);
    try {
      const response = await axios({
        url: `${Config.LISTING_API}skip=1`,
        method: 'GET',
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const CategoryApi = createAsyncThunk(
  'main/CategoryApi',
  async (params, thunkAPI) => {
    console.log('url==>', `${Config.CATEGORY_API}categories`);
    try {
      const response = await axios({
        url: `${Config.CATEGORY_API}/categories`,
        method: 'GET',
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const CategoryListApi = createAsyncThunk(
  'main/CategoryListApi',
  async (params, thunkAPI) => {
   // console.log('url=cl=>', `${Config.CATEGORY_LIST_API}${params}`);
    try {
      const response = await axios({
        url: `${Config.CATEGORY_LIST_API}${params}`,
        method: 'GET',
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const SearchApi = createAsyncThunk(
  'main/SearchApi',
  async (params, thunkAPI) => {
   // console.log('url=sl=>', `${Config.SEARCH_API}${params}`);
    try {
      const response = await axios({
        url: `${Config.SEARCH_API}${params}`,
        method: 'GET',
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const PaginationApi = createAsyncThunk(
  'main/PaginationApi',
  async (params, thunkAPI) => {
    console.log('url==>', `${Config.PAGINATION_API}${params ? params : 1}`);
    try {
      const response = await axios({
        url: `${Config.PAGINATION_API}${params ? params : 1}`,
        method: 'GET',
      });
     // console.log('pagination res--->', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Slices
//--------------------------------
const ListSlice = createSlice({
  name: 'ListingSlice',
  initialState,
  reducers: {
    resetlistingLoader: (state, action) => {
      return {
        ...state,
        listingLoader: null,
      };
    },
    resetcategoryLoading: (state, action) => {
      return {
        ...state,
        categoryLoading: null,
      };
    },
    resetcategoryListLoading: (state, action) => {
      return {
        ...state,
        categoryListLoading: null,
      };
    },
    resetsearchLoading: (state, action) => {
      return {
        ...state,
        searchLoading: null,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ListingApi.pending, (state, action) => {
        state.listingLoader = 'loading';
      })
      .addCase(ListingApi.fulfilled, (state, action) => {
        state.listingData = action.payload?.data?.products;
        AsyncStorage.setItem(
            'ListingValue',
            JSON.stringify(action.payload?.data?.products),
          );
        state.listingLoader = 'loaded';
        state.currentPage = action.payload?.data?.skip;
        // console.log('registration', action);
      })
      .addCase(ListingApi.rejected, (state, action) => {
        console.log('action--->', action);
        state.listingLoader = 'not loaded';
      })
      .addCase(CategoryApi.pending, (state, action) => {
        state.categoryLoading = 'loading';
      })
      .addCase(CategoryApi.fulfilled, (state, action) => {
        state.categoryData = action.payload;
        state.categoryLoading = 'loaded';
        // console.log('registration', action);
      })
      .addCase(CategoryApi.rejected, (state, action) => {
        console.log('action--->', action);
        state.categoryLoading = 'not loaded';
      })
      .addCase(CategoryListApi.pending, (state, action) => {
        state.categoryListLoading = 'loading';
      })
      .addCase(CategoryListApi.fulfilled, (state, action) => {
        state.listingData = action.payload?.data?.products;
        state.categoryListLoading = 'loaded';
        // console.log('registration', action);
      })
      .addCase(CategoryListApi.rejected, (state, action) => {
        console.log('action--->', action);
        state.categoryListLoading = 'not loaded';
      })
      .addCase(SearchApi.pending, (state, action) => {
        state.searchLoading = 'loading';
      })
      .addCase(SearchApi.fulfilled, (state, action) => {
        state.listingData = action.payload?.data?.products;
        state.searchLoading = 'loaded';
        // console.log('registration', action);
      })
      .addCase(SearchApi.rejected, (state, action) => {
        console.log('action--->', action);
        state.searchLoading = 'not loaded';
      })
      .addCase(PaginationApi.pending, (state, action) => {
        state.paginationLoading = 'loading';
      })
      .addCase(PaginationApi.fulfilled, (state, action) => {
        state.currentPage = action.payload?.data?.skip;
        state.paginationLoading = 'loaded';
        if (state.listingData) {
          state.listingData = state.listingData.concat(
            action.payload?.data?.products,
          );
          AsyncStorage.setItem(
            'ListingValue',
            JSON.stringify(action.payload?.data?.products),
          );
        } else {
          state.listingData = action.payload?.data?.products;
          AsyncStorage.setItem(
            'ListingValue',
            JSON.stringify(action.payload?.data?.products),
          );
        }
        // console.log('registration', action);
      })
      .addCase(PaginationApi.rejected, (state, action) => {
        console.log('action--->', action);
        state.paginationLoading = 'not loaded';
      });
  },
});

export const ListingReducer = ListSlice.reducer;
export const ListingAction = ListSlice.actions;
