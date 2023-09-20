import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { Comment, Like, addLike } from '../../store/reducers/posts'
import { selectDeviceId } from '../../store/reducers/device'
import { selectPostById } from '../../store/selectors/posts'
import styles from '../index.styles'

type PropsT = {
  postId: string
  comments: Comment[]
  likes: Like[]
}

const PostInfoBar = ({ postId, comments, likes }: PropsT) => {
  const dispatch = useDispatch()
  const deviceId = useSelector(selectDeviceId)
  const post = useSelector(state => selectPostById(state, postId))

  const handleLike = (id: string) => {
    if (!isLiked()) {
      dispatch(addLike({ postId: id, author: deviceId }))
    }
  }

  const isLiked = () => {
    const likes = post?.likes
    if (likes?.length && likes.find(e => e.author === deviceId)) return true
    return false
  }

  return (
    <View style={styles.bottomRow}>
      <View style={styles.commentsLikes}>
        <TouchableOpacity style={{ marginRight: 8 }}>
          <Text>{comments.length} Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLike(postId)}>
          <Text style={{ color: isLiked() ? 'blue' : 'black' }}>
            {likes.length || 0} Likes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PostInfoBar
