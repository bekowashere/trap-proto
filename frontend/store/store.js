import authReducer from './features/auth/AuthSlice'
import autoReducer from './features/auto/autoSlice'
import cartReducer from './features/cart/cartSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

const rootReducer = combineReducers({
  auth: authReducer,
  auto: autoReducer,
  cart: cartReducer,
})

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const makeStore = ({ isServer }) => {
  if (isServer) {
    return createStore(rootReducer, bindMiddleware([thunkMiddleware]))
  } else {
    
    const persistConfig = {
      key: 'nextjs',
      whitelist: ['auth', 'auto', 'cart'],
      storage,
    }

    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    )

    store.__persistor = persistStore(store)

    return store
  }
}

export const wrapper = createWrapper(makeStore)
