import { configureStore } from '@reduxjs/toolkit'
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
const createDebugger = require('redux-flipper').default

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    __DEV__
      ? getDefaultMiddleware({ serializableCheck: false }).concat(
          createDebugger()
        )
      : getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          }
        })
})
const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export { store, persistor }
