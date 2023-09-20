import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native'
import { Post, fetchAllPosts } from '../../store/reducers/posts'
import { getAllPosts } from '../../store/selectors/posts'
import { ThunkResult } from '../../store'
import PostInfoBar from '../../components/post-info-bar'
import styles from './index.styles'
import CommentRow from '../../components/comment-row'
import Avatar from '../../components/avatar'
import formatHashtags from '../../helpers/format-hashtags'
import SearchBar from '../../components/search-bar'

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch()
  const posts = useSelector(getAllPosts)
  const { data } = posts

  useEffect(() => {
    dispatch<ThunkResult<void>>(fetchAllPosts())
  }, [dispatch])

  useEffect(() => {
    console.log('posts', data)
    if (posts?.error) {
      Alert.alert('Error', posts.error)
    }
  }, [posts])

  const handlePostPress = (id: string) => {
    navigation.navigate('Post', { id })
  }

  const renderItem = ({ item }: { item: Post }) => {
    console.log('item', item)
    return (
      <View style={styles.postContainer}>
        <Avatar author={item.author} />
        <Text style={styles.title}>{formatHashtags(item.title, () => {})}</Text>
        <Image style={styles.postImage} source={{ uri: item.image }} />
        <PostInfoBar
          postId={item.id}
          comments={item.comments}
          likes={item.likes}
        />
        <CommentRow item={item} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.newPost}>
        <Avatar />
        <Button
          title='New Post'
          onPress={() => navigation.navigate('New Post')}
        />
      </View>
      <View>
        <SearchBar />
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
