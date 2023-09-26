import React, { useState } from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'
import Logo from '../../../assets/logo.png'
import { setDeviceId } from '../../store/reducers/device'
import { login, setAuthorUsername } from '../../store/reducers/auth'
import styles from './index.styles'

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
        dispatch(login())
        navigation.navigate('Home')
      })
      .catch(error => console.error('Device registration failed:', error))
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
