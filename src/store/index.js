import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './api/rootReducer';  // Ensure rootReducer is an object, not a combined reducer
import { apiSlice } from './api/apiSlice';

const store = configureStore({
    reducer: {
        ...rootReducer,  // Spread the root reducers
        [apiSlice.reducerPath]: apiSlice.reducer,  // Add the RTK Query reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),  // Add the RTK Query middleware
});

export default store;
