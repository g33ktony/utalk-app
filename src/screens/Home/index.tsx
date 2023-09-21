import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native'
import { Post, fetchAllPosts } from '../../store/reducers/posts'
import { getAllPosts } from '../../store/selectors/posts'
import { selectDeviceId } from '../../store/reducers/device'
import PostInfoBar from '../../components/post-info-bar'
import CommentRow from '../../components/comment-row'
import Avatar from '../../components/avatar'
import SearchBar from '../../components/search-bar'
import formatHashtags from '../../helpers/format-hashtags'
import styles from './index.styles'

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch()
  const posts = useSelector(getAllPosts)
  const deviceId = useSelector(selectDeviceId)
  const { error } = posts
  const [searchVisible, setSearchVisible] = useState(false)

  useEffect(() => {
    dispatch(fetchAllPosts())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error)
    }
  }, [posts])

  const handlePostPress = (id: string) => {
    navigation.navigate('Post', { id })
  }

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={() => handlePostPress(item.id)}>
        <Avatar id={deviceId} author={item.author} />
        <Text style={styles.title}>{formatHashtags(item.title, () => {})}</Text>
        <Image style={styles.postImage} source={{ uri: item.image }} />
        <Text style={{ marginBottom: 15 }}>{item.description}</Text>
      </TouchableOpacity>
      <PostInfoBar
        postId={item.id}
        comments={item.comments}
        likes={item.likes}
      />
      <CommentRow item={item} />
    </View>
  )

  return (
    <View style={styles.container}>
      {searchVisible ? (
        <View>
          <SearchBar onSearch={() => {}} />
        </View>
      ) : null}
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
