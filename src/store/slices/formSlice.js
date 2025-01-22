import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prodi_kode_prodi: '',
  nama: '',
  logo: '',
  url_check: '',
  response_should_be: '',
  is_upload_file: false,
  is_activated: false,
  created_by: ''
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData(state, action) {
      return { ...state, ...action.payload };
    },
    resetFormData() {
      return initialState;
    }
  }
});

export const { setFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;
