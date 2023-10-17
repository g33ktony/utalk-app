import React from 'react'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from '../screens/Login'
import { getAuth } from '../store/selectors/auth'
import MainStack from './main'

const Stack = createStackNavigator()

const Navigation = () => {
  const isAuthenticated = useSelector(getAuth)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Main' : 'LogIn'}>
        <Stack.Screen
          name={'Main'}
          options={{ headerShown: false }}
          component={MainStack}
        />
        <Stack.Screen
          name='LogIn'
          options={{ headerShown: false }}
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
