import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'
import styles from './index.styles'
import { setDeviceId } from '../../store/reducers/device'
import Logo from '../../../assets/logo.png'
import { TextInput } from 'react-native'
import { login, setAuthorUsername } from '../../store/reducers/auth'
import { Alert } from 'react-native'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [username, setUsername] = useState('')

  const handleLogin = () => {
    if (username) {
      dispatch(setAuthorUsername(username))
      registerDevice()
    } else {
      Alert.alert('Error', 'Please enter a username')
    }
  }

  const registerDevice = () => {
    DeviceInfo.getUniqueId()
      .then(uniqueID => {
        dispatch(setDeviceId(uniqueID))
        dispatch(login)
        navigation.navigate('Home')
      })
      .catch(error => console.error('Device registration failed:', error))
  }

  return (
    <View style={styles.container}>
      <Image style={{ marginBottom: 45 }} source={Logo} />

      <TextInput
        style={styles.input}
        placeholder='Enter Username'
        onChangeText={text => setUsername(text)}
        value={username}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen
