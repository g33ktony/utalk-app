import React, { useState } from 'react'
import { View, Text, TextInput, Button, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import {
  launchImageLibrary,
  launchCamera,
  CameraOptions,
  Callback,
  ImagePickerResponse
} from 'react-native-image-picker'
import { addPost } from '../../store/reducers/posts'
import { getUserName } from '../../store/selectors/auth'
import styles from './index.styles'
import { Alert } from 'react-native'

const NewPostScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [postTitle, setPostTitle] = useState('')
  const [postDescription, setPostDescription] = useState('')
  const [mediaUri, setMediaUri] = useState('')
  const userName = useSelector(getUserName)

  const handleMedia = async (
    method: (
      options: CameraOptions,
      callback?: Callback | undefined
    ) => Promise<ImagePickerResponse>
  ) => {
    try {
      const res = await method({
        mediaType: 'mixed'
      })
      if (res.assets?.length) {
        setMediaUri(res.assets[0].uri)
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
          likes: []
        })
      )
      navigation.goBack()
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
          {mediaUri && (
            <Image source={{ uri: mediaUri }} style={styles.previewImage} />
          )}
        </View>
      </View>

      <Button title='Submit Post' onPress={handlePostSubmit} />
    </View>
  )
}

export default NewPostScreen
