import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome' // You can use your preferred icon library
import Avatar from '../avatar'
import { useSelector } from 'react-redux'
import { selectDeviceId } from '../../store/reducers/device'
import { CommentT } from '../../store/reducers/posts'

type PropsT = {
  comment: CommentT
  onLike: (id: string) => void
  onReply: (id: string) => void
}

const Comment = ({ comment, onLike, onReply }: PropsT) => {
  const [isLiked, setIsLiked] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const deviceId = useSelector(selectDeviceId) || ''

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike(comment.id)
  }

  const handleReply = () => {
    onReply(comment.id)
  }

  const toggleReplies = () => {
    setShowReplies(!showReplies)
  }

  return (
    <View style={styles.commentContainer}>
      <Avatar id={deviceId} width={20} height={20} size={20} />
      <Text>
        {comment.author}: {comment.text}
      </Text>

      <TouchableOpacity onPress={handleLike}>
        <Icon
          name={isLiked ? 'heart' : 'heart-o'}
          size={20}
          color={isLiked ? 'red' : 'black'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReply}>
        <Text style={styles.replyButton}>Reply</Text>
      </TouchableOpacity>

      {comment.replies && comment.replies.length > 0 && (
        <TouchableOpacity onPress={toggleReplies}>
          <Text style={styles.toggleRepliesButton}>
            {showReplies ? 'Hide Replies' : 'View Replies'}
          </Text>
        </TouchableOpacity>
      )}

      {showReplies && comment.replies && comment.replies.length > 0 && (
        <View style={styles.repliesContainer}>
          {comment.replies.map(reply => (
            <Comment
              key={reply.id}
              comment={reply}
              onLike={onLike}
              onReply={onReply}
            />
          ))}
        </View>
      )}
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
