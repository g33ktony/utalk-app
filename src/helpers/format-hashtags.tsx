import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './index.styles'

const formatHashtags = (
  text: string,
  handleHashtagClick: (text: string) => void
) => {
  const hashtagRegex = /#(\w+)/g
  const parts = text.split(hashtagRegex)

  return parts.map((part, index) => {
    if (part.match(hashtagRegex)) {
      const hashtag = part.replace('#', '')
      return (
        <TouchableOpacity
          key={index}
          onPress={() => handleHashtagClick(hashtag)}
        >
          <Text style={styles.hashtag}>{part}</Text>
        </TouchableOpacity>
      )
    } else {
      return <Text key={index}>{part}</Text>
    }
  })
}

export default formatHashtags
