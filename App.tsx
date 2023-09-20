/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { Provider } from 'react-redux'
import Navigation from './src/screens/Navigation'
import { store, persistor } from './src/store'
import { PersistGate } from 'redux-persist/integration/react'

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  )
}

export default App
