import React, { useRef, useState } from 'react'
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
import Video from 'react-native-video'

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
  const videoRef = useRef<Video | null>(null)

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

      // if (res) {
      setMediaUri(res.path)

      // }
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
        <ScrollView
          scrollEnabled
          // style={{ height: '100%' }}
          contentContainerStyle={{ flex: 1 }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            keyboardVerticalOffset={90}
            style={styles.container}
            // contentContainerStyle={{ height: '100%', backgroundColor: 'red' }}
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
              <View
                style={{
                  justifyContent: 'flex-end',
                  paddingBottom: 15
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={goBack}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <Icon name='chevron-left' size={28} color='black' />
                    <Text style={{ marginLeft: 10 }}>Go Back</Text>
                  </TouchableOpacity>
                  <Button
                    title='Submit Post'
                    onPress={handlePostSubmit}
                    disabled={!file}
                  />
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
