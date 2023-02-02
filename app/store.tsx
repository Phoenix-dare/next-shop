import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import categoryReducer from "../features/categorySlice";
import subCategoryReducer from "../features/subCategorySlice";
import orderReducer from "../features/orderSlice"


const persistConfig = {
  key: "root",
  storage,
  blacklist: ["products", "categories", "subCategories"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  categories: categoryReducer,
  subCategories: subCategoryReducer,
  order:orderReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

const store = makeStore();
export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
//export const wrapper = createWrapper<AppStore>(makeStore);
