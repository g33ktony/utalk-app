import { RootState } from '..'

export const selectIsShown = (state: RootState) => state.search.isShown
export const selectTerm = (state: RootState) => state.search.term
