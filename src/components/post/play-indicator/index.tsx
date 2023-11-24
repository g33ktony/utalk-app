import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { PostT } from '../../../store/reducers/posts'
import { StyleSheet } from 'react-native'

type PropsT = {
  isPlaying: boolean
  item: PostT
}

const PlayIndicator = ({ isPlaying, item }: PropsT) => {
  return (
    <>
      {!isPlaying && item.videos ? (
        <Icon
          style={styles.icon}
          name='play'
          size={55}
          color='rgba(255,255,255,0.5)'
        />
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center'
  }
})

export default PlayIndicator
