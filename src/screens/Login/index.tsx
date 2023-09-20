import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'
import styles from './index.styles'
import { setDeviceId } from '../../store/reducers/device'
import Logo from '../../../assets/logo.png'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleLogin = () => {
    registerDevice()
  }

  const registerDevice = () => {
    DeviceInfo.getUniqueId()
      .then(uniqueID => {
        console.log('uniqueID', uniqueID)
        dispatch(setDeviceId(uniqueID))
        navigation.navigate('Home')
      })
      .catch(error => console.error('Device registration failed:', error))
  }

  return (
    <View style={styles.container}>
      <Image style={{ marginBottom: 45 }} source={Logo} />

      {/* <TextInput
        style={styles.input}
        placeholder='Device ID'
        onChangeText={text => setDeviceId(text)}
        value={deviceId}
      /> */}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen
