import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
   user: userReducer,
  }
})