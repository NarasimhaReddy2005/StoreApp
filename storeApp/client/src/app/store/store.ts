import { configureStore, legacy_createStore } from "@reduxjs/toolkit";
import counterReducer, {
  counterSlice,
} from "../../features/contact/counterReducer";
import { useDispatch, useSelector } from "react-redux";
import { catalogAPI } from "../../features/catalog/catalogAPI";
import { uiSlice } from "../layout/uiSlice";

export function configureTheStore() {
  return legacy_createStore(counterReducer);
}

export const store = configureStore({
  reducer: {
    [catalogAPI.reducerPath]: catalogAPI.reducer,
    counter: counterSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogAPI.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
