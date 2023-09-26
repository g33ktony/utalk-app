import React from 'react'
import { Text, TouchableOpacity, ViewStyle } from 'react-native'
import styles from './index.styles'

const formatHashtags = (
  text: string,
  style: ViewStyle,
  onPress: (text: string) => void
) => {
  const hashtagRegex = /#(\w+)/g
  const parts = text.split(' ')

  return parts.map((part, index) => {
    if (part.match(hashtagRegex)) {
      return (
        <React.Fragment key={index}>
          <TouchableOpacity onPress={() => onPress(part)}>
            <Text style={[style, styles.hashtag]}>
              {part}
              {index !== parts.length ? ' ' : ''}
            </Text>
          </TouchableOpacity>
        </React.Fragment>
      )
    } else {
      return (
        <Text key={index}>
          {part}
          {index !== parts.length ? ' ' : ''}
        </Text>
      )
    }
  })
}

export default formatHashtags
