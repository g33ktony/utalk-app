import React from 'react'
import { AppRegistry, LogBox } from 'react-native'
import { ApolloProvider } from '@apollo/client'
import client from './src/apollo/mock/client'
import App from './App'
import { name as appName } from './app.json'

const Main = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

LogBox.ignoreAllLogs()

AppRegistry.registerComponent(appName, () => Main)
