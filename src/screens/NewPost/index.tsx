import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getToken } from '../../store/selectors/auth'
import VideoPlayer from '../../components/video-player'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { openPicker } from 'react-native-image-crop-picker'
import { postMedia } from '../../server'
import styles from './index.styles'
import CameraView from '../../components/camera-view'

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
  const [cameraOpen, setCameraOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleMedia = async (method: (options) => void) => {
    try {
      const res = await method({
        width: 300,
        height: 400,
        maxFiles: 1,
        forceJpg: true,
        mediaType: 'any'
      })

      const pathParts = res.path.split('/')
      const fileName = pathParts[pathParts.length - 1].split('.')[0]

      const fileData = {
        uri: res.path,
        type: res.mime,
        name: fileName
      }

      console.log('fileData', fileData)

      setFile(fileData)

      if (res) {
        if (res.mime === 'video/mp4') {
          setVideoUri(res.path || null)
          setMediaUri(null)
        } else {
          setMediaUri(res.path || null)
          setVideoUri(null)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const goBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }]
    })
  }

  const handlePostSubmit = () => {
    setIsLoading(true)
    if ((postTitle && !videoUri) || !mediaUri) {
      const postBody = {
        title: postTitle,
        content: postDescription
      }
      postMedia(file, postBody, token)
        .then(() => {
          setIsLoading(false)
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }]
          })
        })
        .catch(error => {
          setIsLoading(false)
          console.error('Error uploading video:', error)
          Alert.alert(
            'Error submitting post',
            'Something went wrong, please try again.'
          )
        })
    } else {
      Alert.alert('Error', 'Enter a title for the post')
    }
  }

  const handleLaunchLibrary = () => handleMedia(openPicker)
  const handleLaunchCamera = () => setCameraOpen(true)
  const [isVideo, setIsVideo] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  return (
    <>
      <CameraView
        cameraOpen={cameraOpen}
        isVideo={isVideo}
        setCameraOpen={setCameraOpen}
        setFile={setFile}
        setMediaUri={setMediaUri}
        setVideoUri={setVideoUri}
        setIsVideo={setIsVideo}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            keyboardVerticalOffset={90}
            style={styles.container}
          >
            <View style={styles.previewContainer}>
              {mediaUri ? (
                <View>
                  <Image
                    source={{ uri: mediaUri }}
                    resizeMode='cover'
                    resizeMethod='resize'
                    style={styles.previewImage}
                  />
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
            <View style={styles.mediaButtonsContainer}>
              <TouchableOpacity
                style={{
                  width: 75,
                  height: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 8
                }}
                onPress={handleLaunchLibrary}
              >
                <Icon name='picture-o' size={22} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 75,
                  height: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 8
                }}
                onPress={handleLaunchCamera}
              >
                <Icon name='camera' size={22} />
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              value={postTitle}
              placeholderTextColor='gray'
              placeholder='Enter post title'
              onChangeText={setPostTitle}
              editable={!!file}
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              value={postDescription}
              placeholderTextColor='gray'
              placeholder='Description'
              onChangeText={setPostDescription}
              editable={!!file}
            />

            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Button
                title='Submit Post'
                onPress={handlePostSubmit}
                disabled={!file}
              />
            )}
            <Button title='go back' onPress={goBack} />
          </KeyboardAvoidingView>
        </ScrollView>
      </CameraView>
    </>
  )
}

export default NewPostScreen
