import React, { useEffect, useState } from 'react'
import {
  Alert,
  ColorValue,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { PostT, incrementComments } from '../../../store/reducers/posts'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getToken, getUserName } from '../../../store/selectors/auth'
import Avatar from '../../avatar'
import { addComment } from '../../../api'
import useUserAvatar from '../../../helpers/useUserAvatar'
import styles from './index.styles'

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
  const userName = useSelector(getUserName)
  const { userAvatar } = useUserAvatar(userName)
  const [commentInput, setCommentInput] = useState('')
  const token = useSelector(getToken)

  const handleCommentSubmit = () => {
    if (!commentInput) {
      Alert.alert('Error', 'Please enter a comment to continue')
    }
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
      <Avatar path={userAvatar} />
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
