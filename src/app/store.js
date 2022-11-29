import { configureStore } from '@reduxjs/toolkit'
import permissionsReducer from "../features/permissions/permissionsSlice";

export default configureStore({
  reducer: {
    permissions:permissionsReducer,

  },
})