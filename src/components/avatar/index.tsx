import React from 'react'
import { Image, Text, View } from 'react-native'
import styles from './index.styles'

type PropsT = {
  author?: string
  size?: number
  width?: number
  height?: number
  id?: string
}

const Avatar = ({
  author,
  size = 300,
  height = 40,
  width = 40,
  id = ''
}: PropsT) => {
  return (
    <View style={styles.authorRow}>
      <Image
        style={[styles.avatar, { width, height }]}
        source={{ uri: `https://i.pravatar.cc/${size}?u=${id}` }}
      />
      {author ? <Text style={styles.author}>{author}</Text> : null}
    </View>
  )
}

export default Avatar
