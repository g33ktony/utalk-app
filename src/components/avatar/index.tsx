import React from 'react'
import { Image, Text, View } from 'react-native'
import styles from './index.styles'

type PropsT = {
  author?: string
}

const Avatar = ({ author }: PropsT) => {
  return (
    <View style={styles.authorRow}>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://i.pravatar.cc/300' }}
      />
      {author ? <Text style={styles.author}>{author}</Text> : null}
    </View>
  )
}

export default Avatar
