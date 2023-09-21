import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../../screens/Home'
import HeaderLeft from '../../components/header/header-left'
import HeaderRight from '../../components/header/header-right'
import NewPostScreen from '../../screens/NewPost'
import PostScreen from '../../screens/PostDetail'

const Stack = createStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='Main'>
      <Stack.Screen
        name='Main'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='New Post'
        // options={{ headerShown: false }}
        component={NewPostScreen}
      />
      <Stack.Screen name='Post' component={PostScreen} />
    </Stack.Navigator>
  )
}

export default HomeStack
