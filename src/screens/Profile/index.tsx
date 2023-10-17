import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { logout } from '../../store/reducers/auth'
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary
} from 'react-native-image-picker'
import styles from './index.styles'
import { useSelector } from 'react-redux'
import { getFirstName, getUserName } from '../../store/selectors/auth'
import {
  Camera,
  CameraDevice,
  useCameraDevice,
  useCameraFormat
} from 'react-native-vision-camera'
import CameraView from '../../components/camera-view'

interface ImagePickerResponse {
  didCancel?: boolean
  error?: string
  assets: Asset[]
}

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const username = useSelector(getUserName)
  const firstName = useSelector(getFirstName)
  const [profileImage, setProfileImage] = useState<string | undefined>(
    'https://placeimg.com/100/100/people'
  )

  const handleLogout = () => {
    dispatch(logout())
    navigation.reset({
      index: 0,
      routes: [{ name: 'LogIn' }]
    })
  }

  const handleImagePicker = async () => {
    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 0.7,
        presentationStyle: 'popover',
        assetRepresentationMode: 'compatible'
      }
      const response: ImagePickerResponse = await launchImageLibrary(options)
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        console.log('response', response.assets[0].uri)

        const source = { uri: response.assets[0].uri }
        setProfileImage(source.uri)
      }
    } catch (error) {}
  }

  const [cameraOpen, setCameraOpen] = useState(false)
  const [isVideo, setIsVideo] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [file, setFile] = useState<{
    uri: string | undefined
    name: string | undefined
    type: string | undefined
  }>()
  const [mediaUri, setMediaUri] = useState<string | null>('')
  const [videoUri, setVideoUri] = useState<string | null>('')

  useEffect(() => {
    if (file) {
      setProfileImage(file.uri)
    }
    if (mediaUri) {
      setProfileImage(mediaUri)
    }
  }, [file, mediaUri])

  return (
    <View style={styles.container}>
      <CameraView
        cameraOpen={cameraOpen}
        setCameraOpen={setCameraOpen}
        setIsVideo={setIsVideo}
        isVideo={isVideo}
        setIsRecording={setIsRecording}
        isRecording={isRecording}
        setFile={setFile}
        setMediaUri={setMediaUri}
        setVideoUri={setVideoUri}
        hideVideo={true}
      >
        <>
          <View style={styles.profileHeader}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => setCameraOpen(true)}
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
          <View style={styles.userInfo}>
            <Text style={styles.username}>Username: {firstName}</Text>
            <Text style={styles.email}>{username}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </>
      </CameraView>
    </View>
  )
}

export default ProfileScreen
