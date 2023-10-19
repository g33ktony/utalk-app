import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { logout } from '../../store/reducers/auth'
import ImageCropPicker, { openPicker } from 'react-native-image-crop-picker'
import styles from './index.styles'
import { useSelector } from 'react-redux'
import { getFirstName, getUserName } from '../../store/selectors/auth'

import CameraView from '../../components/camera-view'

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
      console.log('res', res)

      setProfileImage(res.path)
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
  const [_, setVideoUri] = useState<string | null>('')

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
