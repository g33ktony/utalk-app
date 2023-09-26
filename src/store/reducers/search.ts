import { createSlice } from '@reduxjs/toolkit'

export interface SearchState {
  isShown: boolean
  term: string
}

const initialState: SearchState = {
  isShown: false,
  term: ''
}

const searchSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsShown: (state, action) => {
      state.isShown = action.payload
    },
    setTerm: (state, action) => {
      state.term = action.payload
    }
  }
})

export const { setIsShown, setTerm } = searchSlice.actions
export default searchSlice.reducer
