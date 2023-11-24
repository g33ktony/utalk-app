import React, { useEffect, useRef, useState } from 'react'
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  View
} from 'react-native'
import { useSelector } from 'react-redux'
import BottomDrawer, {
  BottomDrawerMethods
} from 'react-native-animated-bottom-drawer'
import Comment from '..'
import CommentRow from '../comment-row'
import { CommentT, PostT } from '../../../store/reducers/posts'
import { useScreenDimensions } from '../../../helpers/hooks'
import { getPostComments } from '../../../api'
import { getToken } from '../../../store/selectors/auth'
import styles from './index.styles'

type PropsT = {
  post: PostT | null
  isDrawerOpen: boolean
  onCloseDrawer: () => void
}

const CommentsDrawer = ({ post, isDrawerOpen, onCloseDrawer }: PropsT) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const [comments, setComments] = useState<CommentT[]>([])
  const bottomDrawerRef = useRef<BottomDrawerMethods>(null)
  const { heightByPercent } = useScreenDimensions()
  const token = useSelector(getToken)

  const fetchPostComments = () => {
    getPostComments(post?.postID, token)
      .then(res => setComments(res.data))
      .catch(e => Alert.alert('Error', e.message))
  }

  useEffect(() => {
    if (isDrawerOpen) {
      fetchPostComments()
    }
  }, [isDrawerOpen])

  useEffect(() => {
    if (isDrawerOpen) {
      bottomDrawerRef.current?.open()
    } else {
      bottomDrawerRef.current?.close()
    }
  }, [isDrawerOpen])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const keyboardDidShow = () => {
    setIsKeyboardVisible(true)
  }

  const keyboardDidHide = () => {
    setIsKeyboardVisible(false)
  }

  const drawerContainerStyle = {
    height: heightByPercent(85),
    backgroundColor: '#5B5858',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }

  const commentRowStyle = {
    container: styles.commentRowContainer,
    placeholderColor: 'white',
    input: styles.whiteText
  }

  return (
    <BottomDrawer
      ref={bottomDrawerRef}
      initialHeight={heightByPercent(100)}
      customStyles={{
        container: drawerContainerStyle
      }}
      onClose={onCloseDrawer}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15
        }}
      >
        <Text style={styles.commentsTitle}>Comments:</Text>
        {comments?.length ? (
          <View style={styles.flexContainer}>
            <FlatList
              keyboardShouldPersistTaps='always'
              data={comments}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.commentId}
              renderItem={({ item }) => (
                <Comment
                  textStyle={{ color: 'white' }}
                  comment={item}
                  onLike={() => {}}
                  onReply={() => {}}
                />
              )}
            />
          </View>
        ) : (
          <View style={styles.noComments}>
            <Text style={styles.whiteText}>No comments yet</Text>
          </View>
        )}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={isKeyboardVisible ? 0 : 165}
        contentContainerStyle={styles.flexContainer}
      >
        <CommentRow
          reload={fetchPostComments}
          customStyles={commentRowStyle}
          item={post}
        />
      </KeyboardAvoidingView>
    </BottomDrawer>
  )
}

export default CommentsDrawer
