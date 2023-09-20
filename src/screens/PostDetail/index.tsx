import React, { useEffect, useState } from 'react'
import { Button, FlatList, Image, Text, TextInput, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../store/reducers/posts'
import { selectPostById } from '../../store/selectors/posts'
import styles from './index.styles'
import { selectDeviceId } from '../../store/reducers/device'

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
  const deviceId = useSelector(selectDeviceId)
  const dispatch = useDispatch()
  const [newCommentText, setNewCommentText] = useState('')

  // useEffect(() => {

  // }, [])

  const handleNewComment = () => {
    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      author: deviceId,
      text: newCommentText
    }

    dispatch(addComment({ postId: id, comment: newComment }))
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
      {/* <Text style={styles.postImage}>{post?.image}</Text> */}
      <Image style={styles.postImage} source={{ uri: post?.image }} />
      <Text style={styles.postLikes}>{post?.likes.length} likes</Text>
      <Text style={styles.postComments}>{post?.comments?.length} comments</Text>
      <FlatList
        data={post?.comments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.newComment}>
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
