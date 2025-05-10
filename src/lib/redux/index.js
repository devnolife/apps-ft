import { configureStore } from '@reduxjs/toolkit';
import persyaratanReducer from './slices/persyaratanSlice';
import formReducer from './slices/formSlice';

const store = configureStore({
  reducer: {
    persyaratan: persyaratanReducer,
    form: formReducer,
  },
});

export default store;
