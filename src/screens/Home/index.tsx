import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Post, addComment, fetchAllPosts } from '../../store/reducers/posts'
import { getAllPosts } from '../../store/selectors/posts'
import { ThunkResult } from '../../store'
import PostInfoBar from '../../components/post-info-bar'
import styles from './index.styles'

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch()
  const posts = useSelector(getAllPosts)
  const { data } = posts
  const [commentInput, setCommentInput] = useState('')

  useEffect(() => {
    dispatch<ThunkResult<void>>(fetchAllPosts())
  }, [dispatch])

  const handleCommentSubmit = (id: string) => {
    dispatch(addComment({ postId: id, comment: commentInput }))
    setCommentInput('')
  }

  useEffect(() => {
    console.log('posts', data)
    if (posts?.error) {
      Alert.alert('Error', posts.error)
    }
  }, [posts])

  const handlePostPress = (id: string) => {
    navigation.navigate('Post', { id })
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
      <PostInfoBar
        postId={item.id}
        comments={item.comments}
        likes={item.likes}
      />

      <View style={styles.commentRow}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://i.pravatar.cc/300' }} // You can use the user's actual avatar URL here
        />
        <TextInput
          style={styles.commentInput}
          placeholder='Add a comment...'
          value={commentInput}
          onChangeText={text => setCommentInput(text)}
        />
        <TouchableOpacity
          onPress={() => handleCommentSubmit(item.id)}
          style={styles.sendCommentIcon}
        >
          <Icon name='send' size={20} color='#007AFF' />
        </TouchableOpacity>
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
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

export default HomeScreen
