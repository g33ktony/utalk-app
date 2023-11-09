import React, { ForwardedRef, forwardRef } from 'react'
import { ViewStyle } from 'react-native'
import Video, {
  IgnoreSilentSwitchType,
  ResizeMode,
  VideoRef
} from 'react-native-video'

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
      <Video
        ref={ref}
        repeat
        ignoreSilentSwitch={IgnoreSilentSwitchType.IGNORE}
        paused={paused}
        resizeMode={ResizeMode.COVER}
        source={{ uri }}
        volume={1}
        muted={false}
        style={style}
        controls={true}
      />
    )
  }
)

export default VideoPlayer
