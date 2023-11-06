import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  token: string
  userName: string
  firstName: string
  avatar: string
}

const initialState: AuthState = {
  userName: '',
  token: '',
  firstName: '',
  avatar: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorUsername: (state, action) => {
      state.userName = action.payload
    },
    setUserAvatar: (state, action) => {
      state.avatar = action.payload
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

export const { login, logout, setAuthorUsername, setFirstName, setUserAvatar } =
  authSlice.actions
export default authSlice.reducer
