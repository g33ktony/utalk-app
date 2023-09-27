import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
// import Axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { PostT, setPosts } from '../../store/reducers/posts'
import { getAllPosts } from '../../store/selectors/posts'
import { selectIsShown, selectTerm } from '../../store/selectors/search'
import { setTerm } from '../../store/reducers/search'
import SearchBar from '../../components/search-bar'
import { logout } from '../../store/reducers/auth'
import Post from '../../components/post'
import styles from './index.styles'
import PostListEmptyState from '../../components/post-list-empty-state'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const posts = useSelector(getAllPosts)
  const searchIsShown = useSelector(selectIsShown)
  const searchTerm = useSelector(selectTerm)
  // const filteredPosts = useSelector(selectFilteredPosts)
  const [postsState, setPostsState] = useState(posts.data)
  const { error } = posts

  const clearSearch = () => {
    dispatch(setTerm(''))
  }

  // const fetchPosts = async () => {
  //   clearSearch()
  //   setIsLoading(true)
  //   try {
  //     // const response = await Axios.get('http://192.168.0.33:3000/posts')
  //     const response = await Axios.get('http://localhost:3000/posts')
  //     setTimeout(() => {
  //       dispatch(setPosts(response.data))
  //       setIsLoading(false)
  //     }, 1500)
  //   } catch (error) {
  //     setIsLoading(false)
  //     console.log(error.message)
  //   }
  // }

  const refreshList = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // fetchPosts()
  }

  useEffect(() => {
    refreshList()
  }, [])

  useEffect(() => {
    if (!searchIsShown) {
      clearSearch()
    }
  }, [searchIsShown])

  useEffect(() => {
    if (searchTerm.length) {
      setPostsState(
        postsState.filter(
          post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    } else {
      setPostsState(posts.data)
      clearSearch()
    }
  }, [searchTerm])

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error)
    }
  }, [posts])

  const handleLogOut = () => {
    navigation.replace('LogIn')
    dispatch(logout())
    // dispatch(setPosts([])) // Todo: Remove for production this is dev only
  }

  const renderItem = ({ item }: { item: PostT }) => <Post item={item} />
  const handleSearch = (text: string) => dispatch(setTerm(text))
  // console.log('filteredPosts', filteredPosts)

  // const listData = filteredPosts.length ? filteredPosts : posts.data

  return (
    <View style={styles.container}>
      <SearchBar visible={searchIsShown} onSearch={handleSearch} />
      <View style={styles.postList}>
        <FlatList
          refreshing={isLoading}
          onRefresh={refreshList}
          ListEmptyComponent={<PostListEmptyState />}
          data={postsState}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity onPress={handleLogOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen
