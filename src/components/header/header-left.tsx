import React from 'react'
import { Image, View, Text } from 'react-native'
import Logo from '../../../assets/logo.png'
import styles from './index.styles'

const HeaderLeft = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Image source={Logo} style={styles.headerLeft} />
      <Text style={{ marginTop: 10 }}>beta!</Text>
    </View>
  )
}

export default HeaderLeft
