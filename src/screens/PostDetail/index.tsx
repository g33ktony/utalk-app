import React, { useState } from 'react'
import { Button, FlatList, Text, TextInput, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../store/reducers/posts'
import { selectPostById } from '../../store/selectors/posts'
import styles from './index.styles'

interface RouteParams {
  id: string
}

interface Post {
  id: string
  author: string
  image: string
  likes: number
  comments: Comment[]
}

interface Comment {
  id: string
  author: string
  text: string
}

const PostScreen = () => {
  const route = useRoute()
  const { id } = route.params as RouteParams
  const post = useSelector(state => selectPostById(state, id))

  const dispatch = useDispatch()
  const [newCommentAuthor, setNewCommentAuthor] = useState('')
  const [newCommentText, setNewCommentText] = useState('')

  const handleNewComment = () => {
    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      author: newCommentAuthor,
      text: newCommentText
    }

    dispatch(addComment({ postId: id, comment: newComment }))
    setNewCommentAuthor('')
    setNewCommentText('')
  }
  const renderItem = ({ item }: { item: Comment }) => (
    <View style={styles.comment}>
      <Text style={styles.commentAuthor}>{item.author}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.postTitle}>{post?.author}</Text>
      <Text style={styles.postImage}>{post?.image}</Text>
      <Text style={styles.postLikes}>{post?.likes.length} likes</Text>
      <Text style={styles.postComments}>{post?.comments?.length} comments</Text>
      <FlatList
        data={post?.comments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.newComment}>
        <TextInput
          style={styles.newCommentAuthor}
          value={newCommentAuthor}
          placeholder='Author'
          onChangeText={setNewCommentAuthor}
        />
        <TextInput
          style={styles.newCommentText}
          value={newCommentText}
          placeholder='Comment'
          onChangeText={setNewCommentText}
        />
        <Button title='Comment' onPress={handleNewComment} />
      </View>
    </View>
  )
}

export default PostScreen
