import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { CommentT, Like, addLike, removeLike } from '../../store/reducers/posts'
import { selectDeviceId } from '../../store/reducers/device'
import { selectPostById } from '../../store/selectors/posts'
import styles from '../index.styles'
import Comment from '../comment'
import Icon from 'react-native-vector-icons/FontAwesome'

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
    const likeData = { postId: id, author: deviceId }
    if (!isLiked()) {
      dispatch(addLike(likeData))
    } else {
      console.log('unlike', likeData)
      dispatch(removeLike(likeData))
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
        <Icon
          style={{ marginRight: 8 }}
          name={isLiked() ? 'thumbs-up' : 'thumbs-o-up'}
        />
        <TouchableOpacity
          onPress={() => handleLike(postId)}
          style={{ marginRight: 8 }}
        >
          <Text>{likes.length || 0} Likes</Text>
        </TouchableOpacity>
        <Icon style={{ marginRight: 8 }} name='comment-o' />
        <Text style={{ flex: 1 }}>{comments?.length || 0} Comments</Text>

        {comments?.length ? (
          <TouchableOpacity onPress={() => setShowComments(!showComments)}>
            <Text>View All Comments</Text>
          </TouchableOpacity>
        ) : null}
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
