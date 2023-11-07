import React from 'react'
import { Text, View } from 'react-native'
import styles from './index.styles'
import { useScreenDimensions } from '../../../helpers/hooks'
import DeviceInfo from 'react-native-device-info'

const PostListEmptyState = () => {
  const { fullScreenHeight, HEADER_HEIGHT, insetsBottom, insetsTop } =
    useScreenDimensions()
  const availableHeight =
    fullScreenHeight -
    (DeviceInfo.hasNotch()
      ? HEADER_HEIGHT
      : insetsTop + insetsBottom + HEADER_HEIGHT)
  return (
    <View style={[styles.emptyState, { height: availableHeight }]}>
      <Text style={{ textAlign: 'center' }}>
        At this moment, there are no posts. You're welcome to make the first
        one.
      </Text>
    </View>
  )
}

export default PostListEmptyState
