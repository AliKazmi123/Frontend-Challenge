import { configureStore } from '@reduxjs/toolkit'
import { micrsoftApiReducer } from './reducers/catalogs'

export const store = configureStore({
  reducer: {
      microsoft:micrsoftApiReducer.reducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch