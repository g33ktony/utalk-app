import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome' // You can use your preferred icon library

const Comment = ({ comment, onLike, onReply }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    // Call the parent component's onLike function to handle the like action
    onLike(comment.id)
  }

  const handleReply = () => {
    // Call the parent component's onReply function to handle the reply action
    onReply(comment.id)
  }

  const toggleReplies = () => {
    setShowReplies(!showReplies)
  }

  return (
    <View style={styles.commentContainer}>
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
    margin: 10
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
