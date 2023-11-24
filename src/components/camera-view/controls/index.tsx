import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from '../index.styles'
import { useScreenDimensions } from '../../../helpers/hooks'
import Icon from 'react-native-vector-icons/FontAwesome'

type PropsT = {
  hideVideo: boolean
  isVideo: boolean
  isRecording: boolean
  captureDisabled: boolean
  onPressCapture: () => void
  captureBackground: string
  videoButtonDisabled: boolean
  onPressCameraType: () => void
  positionDisabled: boolean
  onPressPosition: () => void
}

const Controls = ({
  hideVideo,
  isVideo,
  isRecording,
  captureDisabled,
  onPressCapture,
  captureBackground,
  videoButtonDisabled,
  onPressCameraType,
  positionDisabled,
  onPressPosition
}: PropsT) => {
  const { insetsBottom } = useScreenDimensions()
  return (
    <View style={[styles.controlsContainer, { paddingBottom: insetsBottom }]}>
      <View style={styles.cameraControls}>
        {!hideVideo ? (
          <TouchableOpacity
            style={styles.rightButton}
            disabled={videoButtonDisabled}
            onPress={onPressCameraType}
          >
            <Icon
              name={!isVideo ? 'video-camera' : 'camera'}
              size={28}
              color='white'
            />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={[styles.captureButton, { backgroundColor: captureBackground }]}
          disabled={captureDisabled}
          onPress={onPressCapture}
        >
          <Icon
            name={isVideo ? 'video-camera' : 'camera'}
            size={18}
            color='white'
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.flip}
          disabled={positionDisabled}
          onPress={onPressPosition}
        >
          <Icon
            name='refresh'
            size={28}
            color={isRecording ? 'gray' : 'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Controls
