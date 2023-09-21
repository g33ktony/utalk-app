import React from 'react'
import { Image, View } from 'react-native'
import Logo from '../../../assets/logo.png'

const HeaderLeft = () => {
  return (
    <Image
      source={Logo}
      style={{
        marginLeft: 15,
        width: 80,
        height: 80,
        resizeMode: 'contain'
      }}
    />
  )
}

export default HeaderLeft
