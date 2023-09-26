import React from 'react'
import { Image, View } from 'react-native'
import Logo from '../../../assets/logo.png'
import styles from './index.styles'

const HeaderLeft = () => {
  return <Image source={Logo} style={styles.headerLeft} />
}

export default HeaderLeft
