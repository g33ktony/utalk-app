import React, { useState } from 'react'
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { addPost } from '../../store/reducers/posts'
import { selectDeviceId } from '../../store/reducers/device'
import styles from './index.styles'

const NewPostScreen = () => {
  const [postTitle, setPostTitle] = useState('')
  const [mediaUri, setMediaUri] = useState('')
  const dispatch = useDispatch()
  const deviceId = useSelector(selectDeviceId)

  const handleChooseMedia = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'mixed'
      })
      if (res.assets?.length) {
        setMediaUri(res.assets[0].uri)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleTakePhoto = async () => {
    try {
      const res = await launchCamera({
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
    dispatch(
      addPost({
        id: '1',
        title: postTitle,
        author: deviceId,
        description: 'desc',
        image: mediaUri, // Use the selected media URI here
        comments: [],
        likes: []
      })
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={postTitle}
        placeholder='Enter post title'
        onChangeText={text => setPostTitle(text)}
      />

      <Button
        title='Choose Media'
        onPress={handleChooseMedia}
        // You can add styles or customize the button as needed
      />
      <Button title='Take Photo' onPress={handleTakePhoto} />

      <View style={styles.previewContainer}>
        {mediaUri && (
          <Image source={{ uri: mediaUri }} style={styles.previewImage} />
        )}
      </View>

      <Button title='Submit Post' onPress={handlePostSubmit} />
    </View>
  )
}

export default NewPostScreen
