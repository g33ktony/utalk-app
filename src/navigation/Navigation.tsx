import React from 'react'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from '../screens/Login'
import { getAuth } from '../store/selectors/auth'
import HomeStack from './home'
import HeaderLeft from '../components/header/header-left'
import HeaderRight from '../components/header/header-right'

const Stack = createStackNavigator()

const Navigation = () => {
  const isAuthenticated = useSelector(getAuth)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'Login'}>
        <Stack.Screen
          name='Home'
          component={HomeStack}
          options={{
            headerTitle: '',
            headerLeft: () => <HeaderLeft />,
            headerRight: () => <HeaderRight />
          }}
        />
        <Stack.Screen name='LogIn' component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
