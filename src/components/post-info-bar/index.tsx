import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { CommentT, Like, addLike } from '../../store/reducers/posts'
import { selectDeviceId } from '../../store/reducers/device'
import { selectPostById } from '../../store/selectors/posts'
import styles from '../index.styles'
import Comment from '../comment'

type PropsT = {
  postId: string
  comments: CommentT[]
  likes: Like[]
}

const PostInfoBar = ({ postId, comments, likes }: PropsT) => {
  const dispatch = useDispatch()
  const [showComments, setShowComments] = useState(false)
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
        <TouchableOpacity
          style={{ marginRight: 8 }}
          onPress={() => setShowComments(!showComments)}
        >
          <Text>{comments.length} Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLike(postId)}>
          <Text style={{ color: isLiked() ? 'blue' : 'black' }}>
            {likes.length || 0} Likes
          </Text>
        </TouchableOpacity>
      </View>
      {showComments && (
        <FlatList
          data={comments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Comment comment={item} onLike={() => {}} onReply={() => {}} />
          )}
        />
      )}
    </View>
  )
}

export default PostInfoBar
