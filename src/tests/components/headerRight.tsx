import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import HeaderRight from '../../components/header/header-right' // Update the import path accordingly
// import { setIsShown } from '../../store/reducers/search'

// Mock the navigation and redux hooks
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    reset: jest.fn()
  })
}))
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn()
}))

const mockStore = configureStore([])
const store = mockStore({
  search: {
    isShown: false,
    term: ''
  }
})

describe('<HeaderRight />', () => {
  it('renders the search and new post icons', () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <HeaderRight />
      </Provider>
    )

    expect(getByAltText('search icon')).toBeTruthy()
    expect(getByAltText('new post icon')).toBeTruthy()
  })

  it('navigates to new post on plus icon press', () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <HeaderRight />
      </Provider>
    )

    fireEvent.press(getByAltText('new post icon'))
    // Add assertions to check if navigation.reset has been called with the correct parameters
  })

  it('toggles search visibility on search icon press', () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <HeaderRight />
      </Provider>
    )

    fireEvent.press(getByAltText('search icon'))
    // Add assertions to check if setIsShown has been dispatched with the correct parameters
  })
})
