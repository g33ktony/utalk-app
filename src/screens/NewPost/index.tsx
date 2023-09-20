import React, { useState } from 'react'
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native'
import styles from './index.styles'
import { useDispatch } from 'react-redux'
import { addPost } from '../../store/reducers/posts'

const NewPostScreen = () => {
  const [postTitle, setPostTitle] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handlePostSubmit = () => {
    dispatch(
      addPost({
        id: '1',
        title: postTitle,
        author: 'lorem',
        description: 'desc',
        image: mediaUrl,
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

      <Text style={styles.label}>Media (Image/Video URL):</Text>
      <TextInput
        style={styles.input}
        value={mediaUrl}
        placeholder='Enter media URL'
        onChangeText={text => setMediaUrl(text)}
      />

      <View style={styles.previewContainer}>
        {mediaUrl && (
          <Image source={{ uri: mediaUrl }} style={styles.previewImage} />
        )}
      </View>

      <Button
        title='Submit Post'
        onPress={handlePostSubmit}
        disabled={isLoading}
      />
    </View>
  )
}

export default NewPostScreen
