import React, { useEffect, useRef, useState } from 'react'
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
import { postMedia } from '../../api'
import styles from './index.styles'
import CameraView from '../../components/camera-view'
import Video, { IgnoreSilentSwitchType, VideoRef } from 'react-native-video'

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
  const [isVideo, setIsVideo] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const videoRef = useRef<VideoRef | null>(null)

  const handleMedia = async () => {
    try {
      const res = await openPicker({
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

      setFile(fileData)

      if (res.mime === 'video/mp4') {
        return setVideoUri(res.path)
      }

      setMediaUri(res.path)
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
    if (postTitle && postDescription && (videoUri || mediaUri)) {
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
          Alert.alert(
            'Error submitting post',
            'Something went wrong, please try again.'
          )
        })
    } else {
      setIsLoading(false)
      Alert.alert('Error', 'Please enter a title and description')
    }
  }

  const handleLaunchLibrary = () => handleMedia()
  const handleLaunchCamera = () => setCameraOpen(true)

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
        <ScrollView scrollEnabled contentContainerStyle={styles.flexContainer}>
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
                    ref={videoRef}
                    paused={false}
                    style={styles.videoPlayer}
                    uri={videoUri}
                  />
                </View>
              ) : null}
            </View>
            <View style={styles.mediaButtonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleLaunchLibrary}
              >
                <Icon name='picture-o' size={22} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
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
              <View
                style={{
                  justifyContent: 'flex-end',
                  paddingBottom: 15
                }}
              >
                <View style={styles.navigationContainer}>
                  <TouchableOpacity
                    onPress={goBack}
                    style={[styles.navigationButton, styles.back]}
                  >
                    <Icon name='chevron-left' size={16} color='#002677' />
                    <Text style={{ marginLeft: 10, color: '#002677' }}>
                      Go Back
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navigationButton}
                    onPress={handlePostSubmit}
                  >
                    <Text style={{ color: '#002677' }}>Submit Post</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </CameraView>
    </>
  )
}

export default NewPostScreen
