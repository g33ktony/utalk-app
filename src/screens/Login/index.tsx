import React, { useState } from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
  TextInput,
  ActivityIndicator,
  Button
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'
import Logo from '../../../assets/logo.png'
import { setDeviceId } from '../../store/reducers/device'
import { login, setAuthorUsername } from '../../store/reducers/auth'
import styles from './index.styles'
import { logIn, signUp } from '../../api'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    if (email && password) {
      logIn({ email, password })
        .then(res => {
          dispatch(setAuthorUsername(email))
          dispatch(login(res.data.token))
        })
        .then(() => {
          setIsLoading(false)
          registerDevice()
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }]
          })
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

  const toggleMode = () => setIsSignUp(!isSignUp)

  const handleSignUp = () => {
    setIsLoading(true)
    if (email && password && username) {
      signUp({ email, password, username })
        .then(res => {
          dispatch(setAuthorUsername(email))
          dispatch(login(res.data.token))
        })
        .then(() => {
          setIsLoading(false)
          registerDevice()
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }]
          })
        })
        .catch(error => {
          setIsLoading(false)
          Alert.alert(
            'Login Error',
            'Check the info you are entering and try again.'
          )
        })
    } else {
      Alert.alert('Error', 'Please enter all data to continue registering')
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
      keyboardVerticalOffset={90}
      style={styles.container}
    >
      <Image style={{ marginBottom: 45 }} source={Logo} />

      {isSignUp ? (
        <TextInput
          style={styles.input}
          placeholder='Username'
          placeholderTextColor='gray'
          onChangeText={setUsername}
          autoCapitalize='none'
        />
      ) : null}

      <TextInput
        style={styles.input}
        placeholder='Email'
        placeholderTextColor='gray'
        onChangeText={setEmail}
        autoCapitalize='none'
      />

      <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor='gray'
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        disabled={isLoading}
        onPress={isSignUp ? handleSignUp : handleLogin}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>
            {!isSignUp ? 'Sign In' : 'Register'}
          </Text>
        )}
      </TouchableOpacity>

      <Button
        onPress={toggleMode}
        title={isSignUp ? 'Go to Sign In' : 'Register'}
      />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
