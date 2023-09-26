import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import posts from './posts'
import device from './device'
import search from './search'

const rootReducer = combineReducers({
  auth,
  posts,
  device,
  search
})

export default rootReducer
