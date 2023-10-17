import React, {
  Dispatch,
  MutableRefObject,
  ReactElement,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState
} from 'react'
import { View, TouchableOpacity, Platform, Text } from 'react-native'
import {
  Camera,
  CameraDevice,
  useCameraDevice,
  useCameraFormat
} from 'react-native-vision-camera'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useScreenDimensions } from '../../helpers/hooks'

type PropsT = {
  cameraOpen: boolean
  children: ReactElement
  isVideo: boolean
  setIsRecording: Dispatch<SetStateAction<boolean>>
  setFile: Dispatch<
    SetStateAction<
      | {
          uri: string | undefined
          type: string | undefined
          name: string | undefined
        }
      | undefined
    >
  >
  setMediaUri: Dispatch<SetStateAction<string | null>>
  setVideoUri: Dispatch<SetStateAction<string | null>>
  isRecording: boolean
  setCameraOpen: Dispatch<SetStateAction<boolean>>
  setIsVideo: Dispatch<SetStateAction<boolean>>
  hideVideo?: boolean
}

const CameraView = ({
  cameraOpen,
  children,
  isVideo,
  setFile,
  setMediaUri,
  setVideoUri,
  setCameraOpen,
  setIsVideo,
  setIsRecording,
  isRecording,
  hideVideo = false
}: PropsT) => {
  const [cameraPosition, setCameraPosition] = useState('back')
  const [recordedTime, setRecordedTime] = useState(0)
  const { insetsBottom } = useScreenDimensions()
  const camera = useRef<Camera>(null)
  const device: CameraDevice = useCameraDevice(cameraPosition)
  const format = useCameraFormat(device, [
    { videoResolution: { width: 426, height: 240 } },
    { fps: 30 }
  ])

  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setRecordedTime(prevTime => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isRecording])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`
  }

  const toggleCameraType = () => {
    if (!isVideo && Platform.OS === 'android') {
      setIsVideo(!isVideo)
      setTimeout(() => {
        setCameraPosition('front')
      }, 500)
    } else {
      setIsVideo(!isVideo)
    }
  }

  const handleVideoButton = () => {
    if (isRecording) {
      return stopRecording()
    }
    return takeVideo()
  }

  const stopRecording = async () => {
    try {
      await camera?.current?.stopRecording()
      setIsRecording(false)
      setRecordedTime(0)
    } catch (error) {
      console.log('error', error)
    }
  }

  const takePhoto = async () => {
    try {
      const photo = await camera.current?.takePhoto()
      const pathParts = photo.path.split('/')
      const fileName = pathParts[pathParts.length - 1].split('.')[0]
      console.log('photo', photo)
      const fileData = {
        uri: photo.path,
        type: 'image/jpeg',
        name: fileName
      }

      console.log('fileData', fileData)

      setFile(fileData)

      setMediaUri(
        Platform.OS === 'android' ? `file:///${photo?.path}` : photo.path
      )
      setVideoUri(null)
      setCameraOpen(false)
    } catch (error) {
      console.log('error', error.message)
    }
  }

  const takeVideo = () => {
    console.log('recording...')

    setIsRecording(true)
    camera.current?.startRecording({
      fileType: 'mp4',
      videoCodec: 'h264',
      onRecordingFinished: video => {
        console.log('video', video)
        setIsRecording(false)
        setVideoUri(video.path)
        const pathParts = video.path.split('/')
        const fileName = pathParts[pathParts.length - 1].split('.')[0]
        const fileData = {
          uri: video.path,
          type: 'video/mp4',
          name: fileName
        }

        console.log('fileData', fileData)

        setFile(fileData)

        setMediaUri(null)
        setCameraOpen(false)
      },
      onRecordingError: error => console.error(error)
    })
  }

  return (
    <>
      {cameraOpen ? (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <Camera
            video={isVideo}
            photo={!isVideo}
            // audio
            format={format}
            orientation='portrait'
            enableZoomGesture
            ref={camera}
            device={device}
            style={{ flex: 1, position: 'relative' }}
            isActive
          />
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            {isRecording ? (
              <View
                style={{
                  position: 'absolute',
                  top: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    height: 14,
                    width: 14,
                    backgroundColor: 'red',
                    borderWidth: 5,
                    borderRadius: 7,
                    borderColor: 'red',
                    marginRight: 10
                  }}
                />
                <Text style={{ color: 'white' }}>
                  {formatTime(recordedTime)}
                </Text>
              </View>
            ) : null}
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              backgroundColor: 'transparent',
              paddingBottom: insetsBottom,
              paddingTop: 10
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'black'
              }}
            >
              {!hideVideo ? (
                <TouchableOpacity
                  style={{
                    height: 55,
                    width: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 45
                  }}
                  disabled={isRecording}
                  onPress={toggleCameraType}
                >
                  <Icon
                    name={!isVideo ? 'video-camera' : 'camera'}
                    size={28}
                    color='white'
                  />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={{
                  height: 55,
                  width: 55,
                  borderRadius: 55 / 2,
                  borderWidth: 5,
                  borderColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isRecording ? 'red' : 'transparent'
                }}
                onPress={isVideo ? handleVideoButton : takePhoto}
              >
                <Icon
                  name={isVideo ? 'video-camera' : 'camera'}
                  size={18}
                  color='white'
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 55,
                  width: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 45
                }}
                onPress={() =>
                  setCameraPosition(
                    cameraPosition === 'back' ? 'front' : 'back'
                  )
                }
              >
                <Icon name='refresh' size={28} color='white' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        children
      )}
    </>
  )
}

export default CameraView
