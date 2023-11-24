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
  View
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'
import Logo from '../../../assets/logo.png'
import { setDeviceId } from '../../store/reducers/device'
import {
  login,
  setAuthorUsername,
  setFirstName
} from '../../store/reducers/auth'
import styles from './index.styles'
import { logIn, signUp } from '../../api'
import useAppVersion from '../../helpers/useAppVersion'
import useUserAvatar from '../../helpers/useUserAvatar'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { appVersionComponent } = useAppVersion()
  const { fetchUserAvatar } = useUserAvatar(email)

  const handleLogin = async () => {
    setIsLoading(true)
    if (email && password) {
      try {
        const res = await logIn({ email: email.trim(), password: password })
        const token = res.data.token
        dispatch(setAuthorUsername(email))
        dispatch(setFirstName(res.data.authorUsername))
        dispatch(login(token))
        fetchUserAvatar(token)

        if (token) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' as never }]
          })
        }
      } catch (error) {
        Alert.alert(
          'Login Error',
          'Check the info you are entering and try again.'
        )
      } finally {
        registerDevice()
        setIsLoading(false)
      }
    } else {
      Alert.alert('Error', 'Please enter a username and or password')
      setIsLoading(false)
    }
  }

  const toggleMode = () => setIsSignUp(!isSignUp)

  const handleSignUp = () => {
    setIsLoading(true)
    if (email && password && username) {
      signUp({
        email: email.trim(),
        password,
        username: username.trim()
      })
        .then(res => {
          dispatch(setAuthorUsername(email))
          dispatch(login(res.data.token))
        })
        .then(() => {
          setIsLoading(false)
          registerDevice()
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' as never }]
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
      <Image style={styles.logo} source={Logo} />

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

      <TouchableOpacity style={styles.toggleButton} onPress={toggleMode}>
        <Text style={{ color: '#002677' }}>
          {isSignUp ? 'Sign In' : 'Register'}
        </Text>
      </TouchableOpacity>
      <View style={{ position: 'absolute', bottom: 15 }}>
        {appVersionComponent}
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
