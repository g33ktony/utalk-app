import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import Navigation from './src/navigation'
import { store, persistor } from './src/store'
import codePush from 'react-native-code-push'
import { PersistGate } from 'redux-persist/integration/react'
import { View, Text, StyleSheet } from 'react-native'

function App(): JSX.Element {
  const [downloadProgress, setDownloadProgress] = useState<{
    receivedBytes: number
    totalBytes: number
  }>()

  useEffect(() => {
    const downloadProgressCallback = progress => {
      setDownloadProgress(progress)
    }

    codePush.sync(
      {
        checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
        installMode: codePush.InstallMode.IMMEDIATE,
        updateDialog: true
      },
      null,
      downloadProgressCallback
    )
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {downloadProgress ? (
          <View style={styles.progress}>
            <Text style={styles.text}>
              {`Downloading update: ${downloadProgress.receivedBytes} of ${downloadProgress.totalBytes} bytes`}
            </Text>
          </View>
        ) : (
          <Navigation />
        )}
      </PersistGate>
    </Provider>
  )
}

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL
}

codePush.allowRestart()

const codePushApp = codePush(codePushOptions)(App)

const styles = StyleSheet.create({
  progress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  text: {
    color: 'white'
  }
})

export default codePushApp
