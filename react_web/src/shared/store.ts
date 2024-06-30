import { authSlice } from "./auth";
import { userTaskSlice } from "./userTask";
import { authController, userTaskController } from "../services";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    //*Auth
    auth: authSlice.reducer,
    //*UserTask
    userTask: userTaskSlice.reducer,
    //*Api
    [authController.reducerPath]: authController.reducer,
    [userTaskController.reducerPath]: userTaskController.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authController.middleware)
      .concat(userTaskController.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
