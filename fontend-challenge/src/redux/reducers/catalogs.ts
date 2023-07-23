import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { CatalogList } from '../../types/customTypes';



const initialState: CatalogList = {
  learningPaths: [],
};

export const micrsoftApiReducer = createSlice({
  name: 'microsoft', 
  initialState,
  reducers: {
    setLearningPaths: (state, action: PayloadAction<CatalogList>) => {
      console.log('Action Payload:', action.payload)
      state.learningPaths = action.payload.learningPaths;
    },
  },
});

export const { setLearningPaths } = micrsoftApiReducer.actions;


export const selectLearningPaths = (state: RootState) => state.microsoft.learningPaths;

export default micrsoftApiReducer.reducer;
