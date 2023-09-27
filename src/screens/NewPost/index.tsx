import React, { useState } from 'react'
import { View, Text, TextInput, Button, Image, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment-timezone'
import {
  launchImageLibrary,
  launchCamera,
  CameraOptions,
  ImagePickerResponse
} from 'react-native-image-picker'
import { addPost } from '../../store/reducers/posts'
import { getUserName } from '../../store/selectors/auth'
import VideoPlayer from '../../components/video-player'
import styles from './index.styles'

const NewPostScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [postTitle, setPostTitle] = useState('')
  const [postDescription, setPostDescription] = useState('')
  const [mediaUri, setMediaUri] = useState<string | null>(null)
  const [videoUri, setVideoUri] = useState<string | null>(null)
  const userName = useSelector(getUserName)
  const today = moment().format('MM/DD/YYYY')

  const handleMedia = async (
    method: (
      options: CameraOptions,
      callback?: (response: ImagePickerResponse) => void
    ) => void
  ) => {
    try {
      const res: ImagePickerResponse = await new Promise(resolve => {
        method(
          {
            mediaType: 'mixed',
            presentationStyle: 'pageSheet'
          },
          response => resolve(response)
        )
      })
      if (res.assets?.length) {
        if (res.assets[0].type === 'video/quicktime') {
          setVideoUri(res.assets[0].uri || null)
          setMediaUri(null)
        } else {
          setMediaUri(res.assets[0].uri || null)
          setVideoUri(null)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handlePostSubmit = () => {
    if (postTitle) {
      dispatch(
        addPost({
          id: Math.random().toString(36).substr(2, 9),
          title: postTitle,
          author: userName,
          description: postDescription,
          image: mediaUri,
          video: videoUri,
          likes: [],
          createdAt: today,
          updatedAt: today
        })
      )
      navigation.replace('Home')
    } else {
      Alert.alert('Error', 'Enter a title for the post')
    }
  }

  const handleLaunchLibrary = () => handleMedia(launchImageLibrary)
  const handleLaunchCamera = () => handleMedia(launchCamera)

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={postTitle}
          placeholder='Enter post title'
          onChangeText={setPostTitle}
        />
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={postDescription}
          placeholder='Description'
          onChangeText={setPostDescription}
        />

        <Button title='Choose Media' onPress={handleLaunchLibrary} />
        <Button title='Take Photo' onPress={handleLaunchCamera} />

        <View style={styles.previewContainer}>
          {mediaUri ? (
            <Image source={{ uri: mediaUri }} style={styles.previewImage} />
          ) : null}
          {videoUri ? <VideoPlayer uri={videoUri} /> : null}
        </View>
      </View>

      <Button title='Submit Post' onPress={handlePostSubmit} />
    </View>
  )
}

export default NewPostScreen
