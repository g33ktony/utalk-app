import React from 'react'
import { View } from 'react-native'
import Video from 'react-native-video'
import styles from './index.styles'

const VideoPlayer = ({
  uri,
  paused = true
}: {
  uri: string
  paused?: boolean
}) => {
  return (
    <View style={styles.container}>
      <Video
        paused={paused}
        source={{ uri }}
        style={styles.video}
        controls={true}
      />
    </View>
  )
}

export default VideoPlayer
