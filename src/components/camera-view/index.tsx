import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import {
  Camera,
  CameraCaptureError,
  CameraRuntimeError,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useMicrophonePermission
} from 'react-native-vision-camera'
import { useIsFocused } from '@react-navigation/core'
import { useIsForeground, useScreenDimensions } from '../../helpers/hooks'
import {
  HandlerStateChangeEvent,
  TapGestureHandler
} from 'react-native-gesture-handler'
import styles from './index.styles'
import Controls from './controls'
import TopControls from './top-controls'
import RNFS from 'react-native-fs'

type PropsT = {
  cameraOpen: boolean
  children: ReactElement
  isVideo?: boolean
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
  setVideoUri?: Dispatch<SetStateAction<string | null>>
  isRecording: boolean
  setCameraOpen: Dispatch<SetStateAction<boolean>>
  setIsVideo?: Dispatch<SetStateAction<boolean>>
  hideVideo?: boolean
}

const CameraView = ({
  cameraOpen,
  children,
  isVideo = false,
  setFile,
  setMediaUri,
  setVideoUri = () => {},
  setCameraOpen,
  setIsVideo = () => {},
  setIsRecording,
  isRecording,
  hideVideo = false
}: PropsT) => {
  const isFocussed = useIsFocused()
  const isForeground = useIsForeground()
  const isActive = isFocussed && isForeground
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back')
  const [isCameraInitialized, setIsCameraInitialized] = useState(false)
  const [recordedTime, setRecordedTime] = useState(0)
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false)
  const camera = useRef<Camera>(null)
  const { hasPermission, requestPermission } = useMicrophonePermission()
  const {
    hasPermission: cameraPermission,
    requestPermission: requestCameraPermission
  } = useCameraPermission()
  let device = useCameraDevice(cameraPosition)
  const { fullScreenHeight, fullScreenWidth } = useScreenDimensions()
  const screenAspectRatio = fullScreenHeight / fullScreenWidth
  const format = useCameraFormat(device, [
    { videoStabilizationMode: 'auto' },
    { videoAspectRatio: screenAspectRatio },
    { videoResolution: { width: 960, height: 720 } },
    { videoHDR: false },
    { fps: 25 },
    { photoHDR: false },
    { photoAspectRatio: screenAspectRatio },
    { photoResolution: 'max' }
  ])

  const onGestureEvent = async (
    event: HandlerStateChangeEvent<Record<string, unknown>>
  ) => {
    const { x, y } = event.nativeEvent as unknown as { x: number; y: number }
    try {
      await camera.current?.focus({ x, y })
    } catch (error) {
      console.log('error focusing', error)
    }
  }

  useEffect(() => {
    if (!hasPermission) {
      requestPermission().then(() => setHasMicrophonePermission(true))
    }
    if (!cameraPermission) {
      requestCameraPermission()
    }
  }, [])

  const onError = useCallback((error: CameraRuntimeError) => {
    if (
      error.message ===
      '[permission/camera-permission-denied] The Camera permission was denied!'
    ) {
      handleCloseCamera()
      requestCameraPermission()
    }

    console.error(error)
  }, [])

  const toggleCameraType = () => {
    setIsVideo(prev => !prev)
  }

  const handleVideoButton = () => {
    if (isRecording) {
      return stopRecording()
    }
    return takeVideo()
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
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

  const stopRecording = async () => {
    try {
      await camera?.current?.stopRecording()

      setIsRecording(false)
      setRecordedTime(0)
    } catch (error) {
      setIsRecording(false)
      setRecordedTime(0)
      if (error instanceof CameraCaptureError) {
        switch (error.code) {
          case 'capture/file-io-error':
            console.error('Failed to write video to disk!')
            break
          default:
            console.error(error)
            break
        }
      }
    }
  }

  const takePhoto = async () => {
    try {
      const photo = await camera.current?.takePhoto()
      const pathParts = photo?.path.split('/')
      const fileName = pathParts?.[pathParts.length - 1].split('.')[0]
      const fileData = {
        uri: photo?.path,
        type: 'image/jpeg',
        name: fileName
      }

      setFile(fileData)

      setMediaUri(
        Platform.OS === 'android'
          ? `file:///${photo?.path}`
          : photo?.path || null
      )
      setVideoUri(null)
      handleCloseCamera()
    } catch (error) {
      if (error instanceof CameraCaptureError) {
        switch (error.code) {
          case 'capture/file-io-error':
            console.error('Failed to write photo to disk!')
            break
          default:
            console.error(error)
            break
        }
      }
    }
  }

  const takeVideo = async () => {
    setIsRecording(true)
    camera.current?.startRecording({
      fileType: 'mp4',
      videoCodec: 'h264',
      videoBitRate: 200,
      onRecordingFinished: video => {
        const path = video.path
        setIsRecording(false)
        setVideoUri(path)
        const pathParts = path.split('/')
        const fileName = pathParts[pathParts.length - 1].split('.')[0]
        const fileData = {
          uri: path,
          type: 'video/mp4',
          name: fileName
        }
        setFile(fileData)
        setMediaUri(null)
        handleCloseCamera()
      },
      onRecordingError: error => console.log(error)
    })
  }

  const handleCloseCamera = () => {
    if (isRecording) {
      stopRecording()
    }
    setCameraOpen(false)
    setIsVideo(false)
    setCameraPosition('back')
  }

  const handleTogglePosition = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'))
  }, [])

  const onInitialized = useCallback(() => {
    setIsCameraInitialized(true)
  }, [])

  return (
    <>
      {device != null && cameraOpen ? (
        <View style={styles.container}>
          <TapGestureHandler onActivated={onGestureEvent}>
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              format={format}
              fps={30}
              lowLightBoost={device.supportsLowLightBoost}
              isActive={isActive}
              onInitialized={onInitialized}
              onError={onError}
              enableZoomGesture
              orientation='portrait'
              photo
              video
              audio={hasMicrophonePermission}
            />
          </TapGestureHandler>
          <TopControls
            recordedTime={recordedTime}
            isRecording={isRecording}
            closeCamera={handleCloseCamera}
          />
          <Controls
            hideVideo={hideVideo}
            isRecording={isRecording}
            captureDisabled={!isCameraInitialized && !isActive}
            onPressCapture={isVideo ? handleVideoButton : takePhoto}
            captureBackground={isRecording ? 'red' : 'transparent'}
            videoButtonDisabled={
              (!isCameraInitialized && !isActive) || isRecording
            }
            onPressCameraType={toggleCameraType}
            positionDisabled={!isCameraInitialized && !isActive}
            onPressPosition={handleTogglePosition}
            isVideo={isVideo}
          />
        </View>
      ) : (
        children
      )}
    </>
  )
}

export default CameraView
