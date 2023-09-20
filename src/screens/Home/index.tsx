import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Post,
  addLike,
  addPost,
  fetchAllPosts,
  setPosts
} from '../../store/reducers/posts'
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native'
import styles from './index.styles'
import { getAllPosts } from '../../store/selectors/posts'
import { ThunkResult } from '../../store'

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const posts = useSelector(getAllPosts)
  const { data } = posts
  const [newPostAuthor, setNewPostAuthor] = useState('')
  const [newPostImage, setNewPostImage] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch<ThunkResult<void>>(fetchAllPosts())
  }, [dispatch])

  useEffect(() => {
    console.log('posts', data[0]?.comments)
    if (posts?.error) {
      Alert.alert('Error', posts.error)
    }
  }, [posts])

  const handlePostPress = (id: string) => {
    navigation.navigate('Post', { id })
  }

  const handleNewPost = () => {
    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      author: newPostAuthor,
      image: newPostImage,
      likes: 0,
      comments: []
    }
    dispatch(addPost(newPost))

    setNewPostAuthor('')
    setNewPostImage('')
  }

  const handleLike = (id: string) => {
    dispatch(addLike({ postId: id }))
  }

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => handlePostPress(item.id)}
    >
      <View style={styles.authorRow}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://i.pravatar.cc/300' }}
        />
        <Text style={styles.author}>{item.author}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Image style={styles.postImage} source={{ uri: item.image }} />
      <View style={styles.bottomRow}>
        <View style={styles.commentsLikes}>
          <TouchableOpacity
            style={{ marginRight: 8 }}
            onPress={() => handleLike(item.id)}
          >
            <Text>{item.comments.length} Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLike(item.id)}>
            <Text>{item.likes.length || 0} Likes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
  return (
    <View style={styles.container}>
      <View style={styles.newPost}>
        <View style={styles.authorRow}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://i.pravatar.cc/300' }}
          />
        </View>
        <Button
          title='New Post'
          onPress={() => navigation.navigate('New Post')}
        />
      </View>
      {posts.status === 'loading' ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      ) : (
        <FlatList
          data={posts.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  )
}

export default HomeScreen
