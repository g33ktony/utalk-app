import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
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
import { setUserAvatar as setAvatar } from '../../store/reducers/auth'
import useAppVersion from '../../helpers/useAppVersion'
import useUserAvatar from '../../helpers/useUserAvatar'
import Avatar from '../../components/avatar'

const ProfileScreen = () => {
  const dispatch = useDispatch()

  const navigation = useNavigation()
  const username = useSelector(getUserName)
  const { userAvatar, fetchUserAvatar, isAvatarLoading } =
    useUserAvatar(username)
  const token = useSelector(getToken)
  const firstName = useSelector(getFirstName)
  const [user, setUser] = useState(firstName)
  const { appVersionComponent } = useAppVersion()
  const [profileImage, setProfileImage] = useState<string | undefined>(
    userAvatar
  )
  const [cameraOpen, setCameraOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [_, setMediaUri] = useState<string | null>('')
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

  useEffect(() => {
    fetchUserAvatar()
  }, [])

  useEffect(() => {
    setProfileImage(userAvatar)
  }, [userAvatar])

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
      dispatch(setAvatar(fileData.uri))

      setProfileImage(res.path)
    } catch (error) {}
  }

  useEffect(() => {
    if (file) {
      setProfileImage(file?.uri)
      dispatch(setAvatar(file?.uri))
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
    if (!user) {
      setUser(firstName)
      return Alert.alert(
        'Error',
        'You need to fill the username in order to continue saving information.'
      )
    }
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
    <CameraView
      cameraOpen={cameraOpen}
      setCameraOpen={setCameraOpen}
      setIsRecording={setIsRecording}
      isRecording={isRecording}
      setFile={setFile}
      setMediaUri={setMediaUri}
      hideVideo
    >
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          {isAvatarLoading ? (
            <View style={styles.profileImage}>
              <ActivityIndicator />
            </View>
          ) : (
            <Avatar justAvatar author={user} path={userAvatar} size={100} />
          )}
          <TouchableOpacity
            style={[styles.editProfileButton, { marginBottom: 15 }]}
            onPress={handleCameraOpen}
          >
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.editProfileButton, { marginBottom: 15 }]}
            onPress={handleImagePicker}
          >
            <Text style={styles.buttonText}>Choose Profile Photo</Text>
          </TouchableOpacity>
          <Text style={styles.username}>First Name and Last Name:</Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={180}
          style={{ backgroundColor: 'white', alignItems: 'center' }}
        >
          <TextInput
            value={user}
            autoFocus
            style={
              editing
                ? {
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10
                  }
                : {
                    height: 40,
                    margin: 12,
                    padding: 10,
                    textAlign: 'center'
                  }
            }
            editable={editing}
            onChangeText={handleChangeUser}
          />
          <TouchableOpacity
            style={[styles.editProfileButton, { marginBottom: 15 }]}
            onPress={handleEditInfo}
          >
            <Text style={styles.buttonText}>
              {editing ? 'Save' : 'Edit Username'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.editProfileButton, { marginBottom: 10 }]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          {appVersionComponent}
        </KeyboardAvoidingView>
      </View>
    </CameraView>
  )
}

export default ProfileScreen
