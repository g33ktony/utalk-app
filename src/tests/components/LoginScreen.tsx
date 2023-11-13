// import React from 'react'
// import { Text, Alert, ActivityIndicator } from 'react-native'
// import { render, fireEvent } from '@testing-library/react-native'
// import { Provider } from 'react-redux'
// import configureStore from 'redux-mock-store'
// import LoginScreen from '../../screens/Login'

// // Mock the navigation and redux dispatch
// jest.mock('@react-navigation/native', () => ({
//   useNavigation: () => ({
//     reset: jest.fn()
//   })
// }))
// jest.mock('react-redux', () => ({
//   useDispatch: () => jest.fn()
// }))

// // Mock the API calls
// jest.mock('../../api', () => ({
//   logIn: jest.fn(),
//   signUp: jest.fn()
// }))

// // Mock DeviceInfo
// jest.mock('react-native-device-info', () => ({
//   getUniqueId: jest.fn().mockResolvedValue('unique-device-id')
// }))

// const mockAppVersionComponent = <Text>App Version</Text>

// // Mock the custom hooks
// jest.mock('../../helpers/useAppVersion', () => ({
//   useAppVersion: jest
//     .fn()
//     .mockReturnValue({ appVersionComponent: mockAppVersionComponent })
// }))

// jest.mock('../../helpers/useUserAvatar', () => ({
//   useUserAvatar: jest.fn().mockReturnValue({ fetchUserAvatar: jest.fn() })
// }))

// const mockStore = configureStore([])
// const store = mockStore({
//   // ...initial state for the store...
// })

// describe('<LoginScreen />', () => {
//   it('renders the login form with email and password fields', () => {
//     const { getByPlaceholderText } = render(
//       <Provider store={store}>
//         <LoginScreen />
//       </Provider>
//     )

//     expect(getByPlaceholderText('Email')).toBeTruthy()
//     expect(getByPlaceholderText('Password')).toBeTruthy()
//   })

//   it('updates state on text input', () => {
//     const { getByPlaceholderText } = render(
//       <Provider store={store}>
//         <LoginScreen />
//       </Provider>
//     )

//     fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com')
//     fireEvent.changeText(getByPlaceholderText('Password'), 'password')

//     // Add assertions to check if the state has been updated
//     // ...
//   })

//   it('calls the login function with email and password', async () => {
//     const { getByText, getByPlaceholderText } = render(
//       <Provider store={store}>
//         <LoginScreen />
//       </Provider>
//     )

//     fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com')
//     fireEvent.changeText(getByPlaceholderText('Password'), 'password')
//     fireEvent.press(getByText('Sign In'))

//     // Add assertions to check if the login function has been called
//     // ...
//   })

//   it('shows an error alert when login fails', async () => {
//     // Mock the logIn function to reject with an error
//     // ...

//     const { getByText, getByPlaceholderText } = render(
//       <Provider store={store}>
//         <LoginScreen />
//       </Provider>
//     )

//     fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com')
//     fireEvent.changeText(getByPlaceholderText('Password'), 'password')
//     fireEvent.press(getByText('Sign In'))

//     // Add assertions to check if an error alert is shown
//     // ...
//   })

//   it('shows a loading indicator when logging in', async () => {
//     // Mock the logIn function to delay
//     // ...

//     const { getByText, getByPlaceholderText } = render(
//       <Provider store={store}>
//         <LoginScreen />
//       </Provider>
//     )

//     fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com')
//     fireEvent.changeText(getByPlaceholderText('Password'), 'password')
//     fireEvent.press(getByText('Sign In'))

//     // Add assertions to check if the loading indicator is shown
//     // ...
//   })

//   // Add more tests for sign-up, toggling mode, and other functionalities...
// })
