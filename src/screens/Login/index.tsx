import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
// import { setDeviceId } from '../redux/deviceIdSlice'; // Import your Redux action
import styles from './index.styles'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [deviceId, setDeviceId] = useState('')

  const handleLogin = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Your Logo</Text>

      <TextInput
        style={styles.input}
        placeholder='Device ID'
        onChangeText={text => setDeviceId(text)}
        value={deviceId}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen
