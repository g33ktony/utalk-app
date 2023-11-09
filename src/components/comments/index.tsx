import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { CommentT } from '../../store/reducers/posts'
import Avatar from '../avatar'
import useAuthorAvatar from '../../helpers/useAuthorAvatar'

type PropsT = {
  comment: CommentT
  textStyle: ViewStyle
}

const Comment = ({ comment, textStyle }: PropsT) => {
  const { fetchAuthorAvatar, authorAvatar } = useAuthorAvatar(comment.author)

  useEffect(() => {
    fetchAuthorAvatar()
  }, [])

  return (
    <View style={styles.commentContainer}>
      <Avatar
        justAvatar
        author={comment.author}
        size={30}
        path={authorAvatar}
      />

      <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
        <Text style={[textStyle, { marginBottom: 8 }]}>{comment?.author}:</Text>
        <Text style={textStyle}>{comment?.text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    marginVertical: 10
  },
  replyButton: {
    color: 'blue',
    marginLeft: 10
  },
  toggleRepliesButton: {
    color: 'blue',
    marginLeft: 10,
    marginTop: 5
  },
  repliesContainer: {
    marginLeft: 20,
    borderLeftWidth: 2,
    borderColor: '#ccc',
    paddingLeft: 10
  }
})

export default Comment
