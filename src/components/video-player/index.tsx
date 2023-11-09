import React, { ForwardedRef, forwardRef } from 'react'
import { View, ViewStyle } from 'react-native'
import Video, { VideoRef } from 'react-native-video'
import styles from './index.styles'

const VideoPlayer = forwardRef(
  (
    {
      uri,
      paused = true,
      style
    }: {
      uri: string
      paused?: boolean
      style: ViewStyle
    },
    ref: ForwardedRef<VideoRef | null>
  ) => {
    return (
      // <View style={styles.container}>
      <Video
        ref={ref}
        repeat
        // ignoreSilentSwitch='ignore'
        paused={paused}
        // resizeMode='cover'
        source={{ uri }}
        volume={50}
        muted={false}
        style={style}
        controls={true}
      />
      // </View>
    )
  }
)

export default VideoPlayer
