import {configureStore} from '@reduxjs/toolkit';
import {ListingReducer} from '../redux/listing.slice';

export default configureStore({
  reducer: {ListingReducer},
   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
