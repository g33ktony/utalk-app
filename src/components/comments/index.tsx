import React from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { useSelector } from 'react-redux'
import { selectDeviceId } from '../../store/reducers/device'
import { CommentT } from '../../store/reducers/posts'
import Avatar from '../avatar'

type PropsT = {
  comment: CommentT
  textStyle: ViewStyle
}

const Comment = ({ comment, textStyle }: PropsT) => {
  const deviceId = useSelector(selectDeviceId) || ''

  return (
    <View style={styles.commentContainer}>
      <Avatar id={deviceId} width={20} height={20} size={20} />

      <View style={{ flex: 1, flexDirection: 'column' }}>
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
