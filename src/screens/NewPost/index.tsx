import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import {
  launchImageLibrary,
  launchCamera,
  CameraOptions,
  ImagePickerResponse
} from 'react-native-image-picker'
import { getToken } from '../../store/selectors/auth'
import VideoPlayer from '../../components/video-player'
import styles from './index.styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { postMedia } from '../../server'

const NewPostScreen = () => {
  const navigation = useNavigation()
  const token = useSelector(getToken)
  const [postTitle, setPostTitle] = useState('')
  const [file, setFile] = useState<{
    uri: string | undefined
    type: string | undefined
    name: string | undefined
  }>()
  const [postDescription, setPostDescription] = useState('')
  const [mediaUri, setMediaUri] = useState<string | null>(null)
  const [videoUri, setVideoUri] = useState<string | null>(null)

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
            quality: 0.1,
            presentationStyle: 'pageSheet',
            videoQuality: 'low',
            durationLimit: 180,
            includeBase64: true,
            formatAsMp4: true
          },
          response => resolve(response)
        )
      })
      console.log('res', res)
      const fileData = {
        uri: res.assets[0].uri,
        type: res.assets[0].type,
        name: res.assets[0].fileName
      }

      setFile(fileData)

      if (res.assets?.length) {
        if (res.assets[0].type === 'video/mp4') {
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

  const goBack = () => {
    navigation.replace('Home')
  }

  const handlePostSubmit = () => {
    if ((postTitle && !videoUri) || !mediaUri) {
      const postBody = {
        title: postTitle,
        content: postDescription
      }
      postMedia(file, postBody, token)
        .then(response => {
          navigation.replace('Home')
        })
        .catch(error => {
          Alert.alert(
            'Error submitting post',
            'Something went wrong, please try again.'
          )
          console.error('Error uploading video:', error)
        })
    } else {
      Alert.alert('Error', 'Enter a title for the post')
    }
  }

  const handleLaunchLibrary = () => handleMedia(launchImageLibrary)
  const handleLaunchCamera = () => handleMedia(launchCamera)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      style={styles.container}
    >
      <View style={styles.previewContainer}>
        {mediaUri ? (
          <View>
            <Image source={{ uri: mediaUri }} style={styles.previewImage} />
          </View>
        ) : null}
        {videoUri ? (
          <View style={styles.previewImage}>
            <VideoPlayer
              style={{ height: '100%', width: '100%' }}
              uri={videoUri}
            />
          </View>
        ) : null}
      </View>
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

      <View style={styles.mediaButtonsContainer}>
        <TouchableOpacity onPress={handleLaunchLibrary}>
          <Icon name='picture-o' size={22} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLaunchCamera}>
          <Icon name='camera' size={22} />
        </TouchableOpacity>
      </View>
      <Button title='Submit Post' onPress={handlePostSubmit} />
      <Button title='go back' onPress={goBack} />
    </KeyboardAvoidingView>
  )
}

export default NewPostScreen
