import React, { useState } from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
  ActivityIndicator
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'
import Logo from '../../../assets/logo.png'
import { setDeviceId } from '../../store/reducers/device'
import { login, setAuthorUsername } from '../../store/reducers/auth'
import styles from './index.styles'
import { logIn } from '../../server'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    if (username && password) {
      logIn({ email: username, password })
        .then(res => {
          dispatch(setAuthorUsername(username))
          dispatch(login(res.data.token))
          console.log('res', res.data)
        })
        .then(() => {
          setIsLoading(false)
          registerDevice()
          navigation.replace('Home')
        })
        .catch(error => {
          setIsLoading(false)
          Alert.alert(
            'Login Error',
            'Check the info you are entering and try again.'
          )
          console.log('error', error.message)
        })
    } else {
      Alert.alert('Error', 'Please enter a username and or password')
      setIsLoading(false)
    }
  }

  const registerDevice = () => {
    DeviceInfo.getUniqueId()
      .then(uniqueID => {
        dispatch(setDeviceId(uniqueID))
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
        placeholder='Username'
        onChangeText={setUsername}
        value={username}
        autoCapitalize='none'
      />

      <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        disabled={isLoading}
        onPress={handleLogin}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
