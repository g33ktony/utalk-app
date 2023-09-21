import { RootState } from '..'

export const getAuth = (state: RootState) => state.auth.isAuthenticated
export const getUserName = (state: RootState) => state.auth.userName
