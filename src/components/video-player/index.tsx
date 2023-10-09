import React, { MutableRefObject } from 'react'
import { View, ViewStyle } from 'react-native'
import Video from 'react-native-video'
import styles from './index.styles'

const VideoPlayer = ({
  uri,
  paused = true,
  style
}: {
  uri: string
  paused?: boolean
  style: ViewStyle
}) => {
  return (
    <View style={styles.container}>
      <Video
        paused={paused}
        resizeMode='cover'
        source={{ uri }}
        style={style}
        controls={true}
      />
    </View>
  )
}

export default VideoPlayer
