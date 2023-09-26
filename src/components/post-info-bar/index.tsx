import React, { useEffect, useRef } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import BottomDrawer, {
  BottomDrawerMethods
} from 'react-native-animated-bottom-drawer'
import Icon from 'react-native-vector-icons/FontAwesome'
import { addLike, removeLike } from '../../store/reducers/posts'
import { selectPostById } from '../../store/selectors/posts'
import { getUserName } from '../../store/selectors/auth'
import CommentRow from '../comment-row'
import styles from '../index.styles'
import Comment from '../comment'

type PropsT = {
  postId: string
  isDrawerOpen: boolean
  setDrawerOpen: (state: boolean) => void
}

const windowHeight = Dimensions.get('window').height

const PostInfoBar = ({ postId, isDrawerOpen, setDrawerOpen }: PropsT) => {
  const dispatch = useDispatch()
  const authorName = useSelector(getUserName)
  const post = useSelector(state => selectPostById(state, postId))
  const bottomDrawerRef = useRef<BottomDrawerMethods>(null)
  const comments = post?.comments
  const likes = post?.likes

  // Todo: Move this to a helper file
  const heightByPercent = (percent: number) => {
    const multiplier = percent / 100

    return multiplier * windowHeight
  }

  useEffect(() => {
    if (isDrawerOpen) {
      bottomDrawerRef.current?.open()
    } else {
      bottomDrawerRef.current?.close()
    }
  }, [isDrawerOpen])

  const isLiked = () => {
    if (likes?.length && likes.find(e => e.author === authorName)) return true
    return false
  }

  const handleLike = () => {
    const likeData = { postId, author: authorName }

    if (!isLiked()) {
      dispatch(addLike(likeData))
    } else {
      dispatch(removeLike(likeData))
    }
  }

  const handleOpenDrawer = () => {
    setDrawerOpen(false)
  }

  return (
    <View style={styles.bottomRow}>
      <View style={styles.commentsLikes}>
        <TouchableOpacity
          onPress={handleLike}
          style={{
            marginRight: 8,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Icon
            style={{ marginRight: 8 }}
            name={isLiked() ? 'thumbs-up' : 'thumbs-o-up'}
          />
          <Text>{likes?.length || 0} Likes</Text>
        </TouchableOpacity>
        <Icon style={{ marginRight: 8 }} name='comment-o' />
        <Text style={{ flex: 1 }}>{comments?.length || 0} Comments</Text>
        <TouchableOpacity onPress={handleOpenDrawer}>
          <Text>View All</Text>
        </TouchableOpacity>
      </View>
      <BottomDrawer
        initialHeight={windowHeight}
        customStyles={{ container: { height: heightByPercent(60) } }}
        ref={bottomDrawerRef}
        onClose={() => setDrawerOpen(true)}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
            Comments:
          </Text>
          {comments?.length ? (
            <FlatList
              data={comments}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Comment comment={item} onLike={() => {}} onReply={() => {}} />
              )}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text>No comments yet</Text>
            </View>
          )}
        </View>
        <CommentRow item={post} />
      </BottomDrawer>
    </View>
  )
}

export default PostInfoBar
