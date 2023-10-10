import React, { useState } from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
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
import { logIn, signUp } from '../../server'

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
      style={styles.container}
    >
      <Image style={{ marginBottom: 45 }} source={Logo} />

      {isSignUp ? (
        <TextInput
          style={styles.input}
          placeholder='Username'
          onChangeText={setUsername}
          value={username}
          autoCapitalize='none'
        />
      ) : null}

      <TextInput
        style={styles.input}
        placeholder='Email'
        onChangeText={setEmail}
        value={email}
        autoCapitalize='none'
      />

      <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <Button
        onPress={() => setIsSignUp(!isSignUp)}
        title={isSignUp ? 'LogIn' : 'SignUp'}
      />

      <TouchableOpacity
        style={styles.button}
        disabled={isLoading}
        onPress={isSignUp ? handleSignUp : handleLogin}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
