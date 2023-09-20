import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './Home'
import PostScreen from './PostDetail'
import LoginScreen from './Login'
import NewPostScreen from './NewPost'
import { Image } from 'react-native'
import Logo from '../../assets/logo.png'

const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='LogIn' component={LoginScreen} />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <Image
                source={Logo}
                style={{ width: 80, height: 80, resizeMode: 'contain' }} // Customize the width and height as needed
              />
            ),
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen name='New Post' component={NewPostScreen} />
        <Stack.Screen name='Post' component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
