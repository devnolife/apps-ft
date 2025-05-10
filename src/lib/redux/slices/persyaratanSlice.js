import { createSlice } from '@reduxjs/toolkit';
import { GET_ALL_KKP_SYARAT } from 'src/graphql/queries';
import useApiGraphql from 'src/hooks/useApiGraphql';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const persyaratanSlice = createSlice({
  name: 'persyaratan',
  initialState,
  reducers: {
    fetchPersyaratanStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPersyaratanSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchPersyaratanFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPersyaratanStart,
  fetchPersyaratanSuccess,
  fetchPersyaratanFailure,
} = persyaratanSlice.actions;

export const fetchPersyaratan = (userType) => async (dispatch) => {
  dispatch(fetchPersyaratanStart());
  try {
    const { data, error } = useApiGraphql(GET_ALL_KKP_SYARAT, { userType });
    if (error) {
      dispatch(fetchPersyaratanFailure(error.message));
    } else {
      dispatch(fetchPersyaratanSuccess(data.getAllKkpSyarat));
    }
  } catch (error) {
    dispatch(fetchPersyaratanFailure(error.message));
  }
};

export default persyaratanSlice.reducer;
