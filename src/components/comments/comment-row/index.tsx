import React, { useState } from 'react'
import { ColorValue, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { PostT, incrementComments } from '../../../store/reducers/posts'
import Icon from 'react-native-vector-icons/FontAwesome'
import { selectDeviceId } from '../../../store/reducers/device'
import { getToken, getUserName } from '../../../store/selectors/auth'
import Avatar from '../../avatar'
import styles from './index.styles'
import { addComment } from '../../../server'
import { Keyboard } from 'react-native'

type PropsT = {
  item: PostT | null
  customStyles?: {
    placeholderColor?: ColorValue | string
    input?: Object
    container?: Object
  }
  reload?: () => void
}
const CommentRow = ({ item, customStyles, reload = () => {} }: PropsT) => {
  const dispatch = useDispatch()
  const deviceId = useSelector(selectDeviceId) || ''
  const userName = useSelector(getUserName)
  const [commentInput, setCommentInput] = useState('')
  const token = useSelector(getToken)

  const handleCommentSubmit = () => {
    const newComment = {
      text: commentInput,
      post: {
        postId: item?.postID
      },
      user: {
        utalkUserId: 2,
        username: userName
      }
    }
    addComment(item?.postID, newComment, token)
      .then(() => reload())
      .then(() => {
        Keyboard.dismiss()
        dispatch(incrementComments(item?.postID))
      })

    setCommentInput('')
  }

  return (
    <View style={[styles.commentRow, customStyles?.container]}>
      <Avatar id={deviceId} />
      <TextInput
        style={[styles.commentInput, customStyles?.input]}
        placeholder='Add a comment...'
        placeholderTextColor={customStyles?.placeholderColor}
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
