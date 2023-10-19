import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../index.styles'

type PropsT = {
  isRecording: boolean
  closeCamera: () => void
  recordedTime: number
}

const TopControls = ({ isRecording, closeCamera, recordedTime }: PropsT) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`
  }

  return (
    <View style={styles.closeContainer}>
      <View style={styles.closeButton}>
        <TouchableOpacity
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          onPress={closeCamera}
        >
          <Icon name='close' color='white' size={20} />
        </TouchableOpacity>
      </View>
      {isRecording ? (
        <View style={styles.recordingTime}>
          <View style={styles.recordingIndicator} />
          <Text style={styles.timerText}>{formatTime(recordedTime)}</Text>
        </View>
      ) : null}
    </View>
  )
}

export default TopControls
