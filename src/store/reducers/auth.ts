import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  token: string
  userName: string
  firstName: string
}

const initialState: AuthState = {
  userName: '',
  token: '',
  firstName: 'Antonio M'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorUsername: (state, action) => {
      state.userName = action.payload
    },
    login: (state, action) => {
      state.token = action.payload
    },
    logout: state => {
      state.token = ''
    }
  }
})

export const { login, logout, setAuthorUsername } = authSlice.actions
export default authSlice.reducer
