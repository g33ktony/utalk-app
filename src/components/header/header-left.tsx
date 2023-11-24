import React from 'react'
import { Image, View, Text } from 'react-native'
import Logo from '../../../assets/logo.png'
import styles from './index.styles'

const HeaderLeft = () => {
  return (
    <View style={styles.leftContainer}>
      <Image source={Logo} style={styles.headerLeft} testID='logo-image' />
      <Text style={styles.betaText}>beta</Text>
    </View>
  )
}

export default HeaderLeft
