import React, { useEffect, useState } from 'react'
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
import codePush from 'react-native-code-push'
import ProgressBar from '../../components/progress-bar'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // const [installing, setInstalling] = useState(false)
  // const [downloading, setDownloading] = useState(false)
  // const [total, setTotal] = useState(0)
  // const [received, setReceived] = useState(0)

  // useEffect(() => {
  //   codePush.sync(
  //     { updateDialog: true },
  //     status => {
  //       switch (status) {
  //         case codePush.SyncStatus.DOWNLOADING_PACKAGE:
  //           // Show "downloading" modal
  //           setDownloading(true)
  //           break
  //         case codePush.SyncStatus.INSTALLING_UPDATE:
  //           setInstalling(true)
  //           // Hide "downloading" modal
  //           break
  //       }
  //     },
  //     ({ receivedBytes, totalBytes }) => {
  //       setReceived(receivedBytes)
  //       setTotal(totalBytes)
  //       console.log('receivedBytes', receivedBytes)
  //       console.log('totalBytes', totalBytes)

  //       /* Update download modal progress */
  //     }
  //   )
  // }, [])

  const handleLogin = () => {
    setIsLoading(true)
    if (email && password) {
      logIn({ email: email.trim(), password: password })
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
      <Image style={{ marginBottom: 45 }} source={Logo} />

      {/* {installing ? <Text>Installing update.</Text> : null} */}
      {/* {installing ? <Text>Installing update, please wait...</Text> : null} */}
      {/* {downloading ? <Text>Downloading update.</Text> : null} */}
      {/* {downloading ? <Text>Downloading update, please wait...</Text> : null} */}
      {/* {downloading ? (
        <ProgressBar totalBytes={total} receivedBytes={received} />
      ) : null} */}

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
      {/* <View style={{ flexDirection: 'row' }}> */}
      <TouchableOpacity
        style={[styles.button, { marginBottom: 25 }]}
        disabled={isLoading}
        onPress={isSignUp ? handleSignUp : handleLogin}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>
            {!isSignUp ? 'Sign In' : 'Registerkjhkjhjkhkjhkj'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{ justifyContent: 'center' }}
        onPress={toggleMode}
      >
        <Text>{isSignUp ? 'Go to Sign In' : 'Go to Register'}</Text>
      </TouchableOpacity>
      {/* </View> */}
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
