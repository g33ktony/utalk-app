import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import posts from './posts'
import device from './device'

const rootReducer = combineReducers({
  auth,
  posts,
  device
})

export default rootReducer
