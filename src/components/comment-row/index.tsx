import React, { useState } from 'react'
import { Post, addComment } from '../../store/reducers/posts'
import { useDispatch, useSelector } from 'react-redux'
import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './index.styles'
import { selectDeviceId } from '../../store/reducers/device'

type PropsT = {
  item: Post
}
const CommentRow = ({ item }: PropsT) => {
  const dispatch = useDispatch()
  const deviceId = useSelector(selectDeviceId)
  const [commentInput, setCommentInput] = useState('')

  const handleCommentSubmit = () => {
    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      author: deviceId,
      text: commentInput
    }
    dispatch(addComment({ postId: item.id, comment: newComment }))
    setCommentInput('')
  }

  return (
    <View style={styles.commentRow}>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://i.pravatar.cc/300' }} // You can use the user's actual avatar URL here
      />
      <TextInput
        style={styles.commentInput}
        placeholder='Add a comment...'
        value={commentInput}
        onChangeText={text => setCommentInput(text)}
      />
      <TouchableOpacity
        onPress={handleCommentSubmit}
        style={styles.sendCommentIcon}
      >
        <Icon name='send' size={20} color='#007AFF' />
      </TouchableOpacity>
    </View>
  )
}

export default CommentRow
