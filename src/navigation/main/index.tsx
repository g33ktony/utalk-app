import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome'
import HeaderLeft from '../../components/header/header-left'
import HeaderRight from '../../components/header/header-right'
import HomeStack from './home-stack'
import ProfileScreen from '../../screens/Profile'

const Drawer = createDrawerNavigator()

const MainStack = () => {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused }) => (
            <Icon name={focused ? 'user' : 'user-o'} />
          )
        }}
        name='Profile'
        component={ProfileScreen}
      />
      <Drawer.Screen
        name='Home'
        options={{
          drawerIcon: ({ focused }) => (
            <Icon name={focused ? 'circle' : 'circle-o'} />
          ),
          headerShown: false
        }}
        component={HomeStack}
      />
    </Drawer.Navigator>
  )
}

export default MainStack
