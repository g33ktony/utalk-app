import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { PostT, filterPosts, setPosts } from '../../store/reducers/posts'
import { getAllPosts, selectFilteredPosts } from '../../store/selectors/posts'
import { selectIsShown, selectTerm } from '../../store/selectors/search'
import { setTerm } from '../../store/reducers/search'
import SearchBar from '../../components/search-bar'
import { logout } from '../../store/reducers/auth'
import Post from '../../components/post'
import styles from './index.styles'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const posts = useSelector(getAllPosts)
  const searchIsShown = useSelector(selectIsShown)
  const searchTerm = useSelector(selectTerm)
  const filteredPosts = useSelector(selectFilteredPosts)
  const { error } = posts

  const clearSearch = () => {
    dispatch(setTerm(''))
    dispatch(filterPosts(''))
  }

  const fetchPosts = async () => {
    clearSearch()
    setIsLoading(true)
    try {
      const response = await Axios.get('http://192.168.0.33:3000/posts')
      setTimeout(() => {
        const combinedData = [...posts.data, ...response.data]
        const newData = Array.from(new Set(combinedData))
        dispatch(setPosts(newData))
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (!searchIsShown) {
      clearSearch()
    }
  }, [searchIsShown])

  useEffect(() => {
    if (searchTerm.length) {
      dispatch(filterPosts(searchTerm))
    } else {
      clearSearch()
    }
  }, [searchTerm])

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error)
    }
  }, [posts])

  const handleLogOut = () => {
    dispatch(logout())
    dispatch(setPosts([])) // Todo: Remove for production this is dev only
    navigation.navigate('LogIn')
  }

  const renderItem = ({ item }: { item: PostT }) => <Post item={item} />

  return (
    <View style={styles.container}>
      {searchIsShown ? (
        <SearchBar onSearch={text => dispatch(setTerm(text))} />
      ) : null}
      {!posts.data.length && !isLoading ? (
        <View style={styles.emptyState}>
          <Text>Not content yet</Text>
        </View>
      ) : (
        <View style={styles.postList}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          ) : (
            <FlatList
              refreshing={isLoading}
              onRefresh={fetchPosts}
              data={filteredPosts.length ? filteredPosts : posts.data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}
      <TouchableOpacity onPress={handleLogOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen
