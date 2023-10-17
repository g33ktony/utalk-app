import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from '../../screens/Home'
import NewPostScreen from '../../screens/NewPost'
import HeaderLeft from '../../components/header/header-left'
import HeaderRight from '../../components/header/header-right'
// import ProfileScreen from '../../screens/Profile'

const Stack = createStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='Main'>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />
        }}
        name='Main'
        component={MainScreen}
      />
      <Stack.Screen name='New Post' component={NewPostScreen} />
    </Stack.Navigator>
  )
}

export default HomeStack
