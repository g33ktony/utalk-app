import { RootState } from '..'

export const getAuth = (state: RootState) => !!state.auth.token
export const getUserName = (state: RootState) => state.auth.userName
export const getFirstName = (state: RootState) => state.auth.firstName
export const getToken = (state: RootState) => state.auth.token
