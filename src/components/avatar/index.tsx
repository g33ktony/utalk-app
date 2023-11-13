import React from 'react'
import { Text, View, Image } from 'react-native'
import styles from './index.styles'
import FastImage from 'react-native-fast-image'
import UserAvatar from 'react-native-user-avatar'
import useUserAvatar from '../../helpers/useUserAvatar'
import { StyleProp } from 'react-native'
import { ViewStyle } from 'react-native'

type PropsT = {
  author?: string
  size?: number
  path?: string
  justAvatar?: boolean
  customStyle?: StyleProp<ViewStyle>
}

const Avatar = ({
  author,
  path = '',
  size = 40,
  justAvatar = false,
  customStyle = {}
}: PropsT) => {
  return (
    <View style={[styles.authorRow, customStyle]} testID='avatar-container'>
      {path ? (
        <Image
          testID='image-avatar'
          style={[
            styles.avatar,
            { marginRight: justAvatar ? 0 : 8 },
            { width: size, height: size, borderRadius: size / 2 }
          ]}
          source={{
            uri: `file://${path}`
          }}
        />
      ) : (
        <View style={{ marginRight: 8 }} testID='generated-avatar'>
          <UserAvatar
            testID='generated-avatar'
            size={size}
            name={author}
            bgColors={['#6750A5', '#2DBC9C', '#8D23AC', '#DA8432', '#253A8D']}
          />
        </View>
      )}
      {author && !justAvatar ? (
        <Text style={styles.author}>{author}</Text>
      ) : null}
    </View>
  )
}

export default Avatar
