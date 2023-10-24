import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { logout, setFirstName } from '../../store/reducers/auth'
import { openPicker } from 'react-native-image-crop-picker'
import styles from './index.styles'
import { useSelector } from 'react-redux'
import { getFirstName, getToken, getUserName } from '../../store/selectors/auth'
import CameraView from '../../components/camera-view'
import { setUserAvatar, setUserName } from '../../api'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const username = useSelector(getUserName)
  const token = useSelector(getToken)
  const firstName = useSelector(getFirstName)
  const [user, setUser] = useState(firstName)
  const [profileImage, setProfileImage] = useState<string | undefined>(
    'https://placeimg.com/100/100/people'
  )
  const [cameraOpen, setCameraOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [mediaUri, setMediaUri] = useState<string | null>('')
  const [file, setFile] = useState<{
    uri: string | undefined
    name: string | undefined
    type: string | undefined
  }>()

  const handleLogout = () => {
    dispatch(logout())
    navigation.reset({
      index: 0,
      routes: [{ name: 'LogIn' as never }]
    })
  }

  const handleImagePicker = async () => {
    try {
      const options = {
        width: 300,
        height: 400,
        maxFiles: 1,
        forceJpg: true,
        mediaType: 'any'
      }
      const res = await openPicker(options)
      const pathParts = res.path.split('/')
      const fileName = pathParts[pathParts.length - 1].split('.')[0]
      const fileData = {
        uri: res.path,
        type: res.mime,
        name: fileName
      }
      setFile(fileData)

      setProfileImage(res.path)
    } catch (error) {}
  }

  useEffect(() => {
    if (file) {
      setProfileImage(file?.uri)
      setUserAvatar(file, token)
        .then(() => {
          Alert.alert('Success', 'Profile avatar was successfully changed.')
        })
        .catch(e => {
          Alert.alert('Error', 'Something went wrong, please try again.')
        })
    }
  }, [file])

  const handleCameraOpen = () => setCameraOpen(true)

  const handleSaveInfo = () => {
    setUserName(
      {
        username: user
      },
      token
    )
      .then(() => {
        dispatch(setFirstName(user))
      })
      .then(() => {
        Alert.alert('Success', 'The username has been changed successfully')
      })
      .catch(e => {
        Alert.alert('Error', 'Something happened, please try again')
      })
  }

  const handleChangeUser = (text: string) => {
    setUser(text)
  }
  const handleEditInfo = () => {
    if (editing) {
      handleSaveInfo()
    }
    setEditing(prev => !prev)
  }

  return (
    <View style={styles.container}>
      <CameraView
        cameraOpen={cameraOpen}
        setCameraOpen={setCameraOpen}
        setIsRecording={setIsRecording}
        isRecording={isRecording}
        setFile={setFile}
        setMediaUri={setMediaUri}
        hideVideo
      >
        <>
          <View style={styles.profileHeader}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={handleCameraOpen}
            >
              <Text>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={handleImagePicker}
            >
              <Text>Choose Profile Photo</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.userInfo}
          >
            <Text style={styles.username}>Username:</Text>
            <TextInput
              value={user}
              editable={editing}
              onChangeText={handleChangeUser}
            />
            <TouchableOpacity
              style={[styles.editProfileButton]}
              onPress={handleEditInfo}
            >
              <Text>{editing ? 'Save' : 'Edit Username'}</Text>
            </TouchableOpacity>
            <Text style={styles.email}>Email: {username}</Text>
          </KeyboardAvoidingView>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </>
      </CameraView>
    </View>
  )
}

export default ProfileScreen
