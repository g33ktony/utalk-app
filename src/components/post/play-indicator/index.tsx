import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { PostT } from '../../../store/reducers/posts'

type PropsT = {
  isPlaying: boolean
  item: PostT
}

const PlayIndicator = ({ isPlaying, item }: PropsT) => (
  <>
    {!isPlaying && !item.images ? (
      <Icon
        style={{ alignSelf: 'center' }}
        name='play'
        size={55}
        color='rgba(255,255,255,0.5)'
      />
    ) : null}
  </>
)

export default PlayIndicator
