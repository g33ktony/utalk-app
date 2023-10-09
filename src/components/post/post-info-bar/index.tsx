import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { selectPostById } from '../../../store/selectors/posts'
import { likePost } from '../../../server'
import CommentsDrawer from '../../comments/comments-drawer'
import styles from './index.styles'
import { getToken } from '../../../store/selectors/auth'
import { addOrToggleLike } from '../../../store/reducers/posts'

type PropsT = {
  postId: string
}

const PostInfoBar = ({ postId }: PropsT) => {
  const post = useSelector(state => selectPostById(state, postId))
  const token = useSelector(getToken)
  const dispatch = useDispatch()

  const likes = post?.likeCount || 0
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const handleLike = async () => {
    try {
      const res = await likePost(postId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(addOrToggleLike(postId))
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleOpenDrawer = () => setDrawerOpen(true)
  const onCloseDrawer = () => setDrawerOpen(false)

  return (
    <View style={styles.bottomRow}>
      <View style={styles.commentsLikes}>
        <TouchableOpacity
          onPress={handleLike}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.likeButton}
        >
          <Icon
            style={styles.like}
            name={post?.loggedInUserLiked ? 'thumbs-up' : 'thumbs-o-up'}
          />
          <Text style={styles.likeText}>{likes} Likes</Text>
        </TouchableOpacity>
        <Icon style={styles.commentIcon} name='comment-o' />
        <Text style={styles.commentText}>
          {post?.commentCount || 0} Comments
        </Text>
        <TouchableOpacity onPress={handleOpenDrawer}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <CommentsDrawer
        post={post}
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={onCloseDrawer}
      />
    </View>
  )
}

export default PostInfoBar
