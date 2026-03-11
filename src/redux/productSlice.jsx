import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  featuredProducts: [],
  selectedProduct: null,
  categories: [],
  loading: false,
  error: null,
  filters: {
    category: null,
    priceRange: { min: 0, max: 1000000 },
    rating: null
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchFeaturedProductsSuccess: (state, action) => {
      state.featuredProducts = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        priceRange: { min: 0, max: 1000000 },
        rating: null
      };
    }
  }
});

export const { 
  fetchProductsStart, fetchProductsSuccess, fetchProductsFailure,
  fetchFeaturedProductsSuccess, setSelectedProduct, setFilters, clearFilters
} = productSlice.actions;

export default productSlice.reducer;