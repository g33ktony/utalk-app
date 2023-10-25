/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { Provider } from 'react-redux'
import Navigation from './src/navigation'
import { store, persistor } from './src/store'
import codePush from 'react-native-code-push'
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
let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: true
}

codePush.allowRestart()

const codePushApp = codePush(codePushOptions)(App)

export default codePushApp
