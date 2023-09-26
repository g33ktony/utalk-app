import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { PostT, addComment } from '../../store/reducers/posts'
import Icon from 'react-native-vector-icons/FontAwesome'
import { selectDeviceId } from '../../store/reducers/device'
import { getUserName } from '../../store/selectors/auth'
import Avatar from '../avatar'
import styles from './index.styles'

type PropsT = {
  item: PostT
}
const CommentRow = ({ item }: PropsT) => {
  const dispatch = useDispatch()
  const deviceId = useSelector(selectDeviceId) || ''
  const userName = useSelector(getUserName)
  const [commentInput, setCommentInput] = useState('')

  const handleCommentSubmit = () => {
    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      author: userName,
      text: commentInput
    }
    dispatch(addComment({ postId: item.id, comment: newComment }))
    setCommentInput('')
  }

  return (
    <View style={styles.commentRow}>
      <Avatar id={deviceId} />
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
        <Icon name='send' size={20} color='black' />
      </TouchableOpacity>
    </View>
  )
}

export default CommentRow
