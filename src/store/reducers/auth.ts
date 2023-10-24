import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  token: string
  userName: string
  firstName: string
}

const initialState: AuthState = {
  userName: '',
  token: '',
  firstName: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorUsername: (state, action) => {
      state.userName = action.payload
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload
    },
    login: (state, action) => {
      state.token = action.payload
    },
    logout: state => {
      state.token = ''
    }
  }
})

export const { login, logout, setAuthorUsername, setFirstName } =
  authSlice.actions
export default authSlice.reducer
