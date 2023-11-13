import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import SearchBar from '../../components/search-bar'

const mockStore = configureStore([])

describe('SearchBar Component', () => {
  let store
  let component
  const mockOnSearch = jest.fn()
  const mockOnClearInput = jest.fn()

  beforeEach(() => {
    store = mockStore({
      search: {
        isShown: false,
        term: ''
      }
      // Add your initial state here
    })

    component = (
      <Provider store={store}>
        <SearchBar
          onSearch={mockOnSearch}
          onClearInput={mockOnClearInput}
          visible={true}
        />
      </Provider>
    )
  })

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(component)
    expect(getByPlaceholderText('Search...')).toBeTruthy()
  })

  it('calls onSearch when text is changed', () => {
    const { getByPlaceholderText } = render(component)
    const input = getByPlaceholderText('Search...')
    fireEvent.changeText(input, 'test')
    expect(mockOnSearch).toHaveBeenCalledWith('test')
  })

  it('calls onClearInput when close icon is pressed', () => {
    const { getByTestId } = render(component)
    const closeButton = getByTestId('close-button') // Add testID='close-button' to your TouchableOpacity
    fireEvent.press(closeButton)
    expect(mockOnClearInput).toHaveBeenCalled()
  })

  it('does not render when visible is false', () => {
    const { queryByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar
          onSearch={mockOnSearch}
          onClearInput={mockOnClearInput}
          visible={false}
        />
      </Provider>
    )
    expect(queryByPlaceholderText('Search...')).toBeNull()
  })
})
