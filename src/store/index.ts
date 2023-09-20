import { ThunkAction, configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import { fetchAllPosts } from './reducers/posts'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

const persistor = persistStore(store)

export { store, persistor }
export type RootState = ReturnType<typeof store.getState>
type FetchAllPostsAction = ReturnType<typeof fetchAllPosts.fulfilled>

export type ThunkResult<R> = ThunkAction<
  R,
  RootState,
  unknown,
  FetchAllPostsAction
>
export type AppDispatch = typeof store.dispatch
