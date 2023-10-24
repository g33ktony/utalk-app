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
import BottomDrawer, {
  BottomDrawerMethods
} from 'react-native-animated-bottom-drawer'
import Comment from '..'
import CommentRow from '../comment-row'
import { CommentT, PostT } from '../../../store/reducers/posts'
import { useScreenDimensions } from '../../../helpers/hooks'
import { getPostComments } from '../../../api'
import { useSelector } from 'react-redux'
import { getToken } from '../../../store/selectors/auth'
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

  return (
    <BottomDrawer
      ref={bottomDrawerRef}
      initialHeight={heightByPercent(100)}
      customStyles={{
        container: {
          height: heightByPercent(85),
          backgroundColor: '#5B5858',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      }}
      onClose={onCloseDrawer}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 15,
            color: 'white'
          }}
        >
          Comments:
        </Text>
        {comments?.length ? (
          <View style={{ flex: 1 }}>
            <FlatList
              keyboardShouldPersistTaps='always'
              data={comments}
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
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'white' }}>No comments yet</Text>
          </View>
        )}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={isKeyboardVisible ? 0 : 165}
        contentContainerStyle={{ flex: 1 }}
      >
        <CommentRow
          reload={fetchPostComments}
          customStyles={{
            container: { paddingHorizontal: 15, marginBottom: 20 },
            placeholderColor: 'white',
            input: { color: 'white' }
          }}
          item={post}
        />
      </KeyboardAvoidingView>
    </BottomDrawer>
  )
}

export default CommentsDrawer
