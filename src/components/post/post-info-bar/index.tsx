import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { selectPostById } from '../../../store/selectors/posts'
import { likePost } from '../../../server'
import CommentsDrawer from '../../comments/comments-drawer'
import { getToken } from '../../../store/selectors/auth'
import { addOrToggleLike } from '../../../store/reducers/posts'
import styles from './index.styles'

type PropsT = {
  postId: string
  setIsPlaying: (value: boolean) => void
}

const PostInfoBar = ({ postId, setIsPlaying }: PropsT) => {
  const dispatch = useDispatch()
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const post = useSelector(state => selectPostById(state, postId))
  const token = useSelector(getToken)
  const hitSlopConfig = { top: 10, bottom: 10, left: 10, right: 10 }
  const likeIcon = post?.loggedInUserLiked ? 'thumbs-up' : 'thumbs-o-up'
  const likes = post?.likeCount || 0

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

  const handleOpenDrawer = () => {
    setIsPlaying(false)
    setDrawerOpen(true)
  }
  const onCloseDrawer = () => {
    setIsPlaying(true)
    setDrawerOpen(false)
  }

  return (
    <View style={styles.bottomRow}>
      <View style={styles.commentsLikes}>
        <TouchableOpacity
          onPress={handleLike}
          hitSlop={hitSlopConfig}
          style={styles.likeButton}
        >
          <Icon style={styles.like} name={likeIcon} />
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
