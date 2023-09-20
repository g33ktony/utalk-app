// index.js or App.js

import React from 'react'
import { AppRegistry } from 'react-native'
import { ApolloProvider } from '@apollo/client'
import client from './src/apollo/mock/server' // Import your Apollo Client instance
import App from './App' // Replace with your app's main component
import { name as appName } from './app.json'

const Main = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => Main)
