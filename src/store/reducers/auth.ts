import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  userName: string
}

const initialState: AuthState = {
  userName: '',
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorUsername: (state, action) => {
      state.userName = action.payload
    },
    login: state => {
      state.isAuthenticated = true
    },
    logout: state => {
      state.isAuthenticated = false
    }
  }
})

export const { login, logout, setAuthorUsername } = authSlice.actions
export default authSlice.reducer
