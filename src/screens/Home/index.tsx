import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  View,
  RefreshControl,
  Platform
} from 'react-native'
import Video from 'react-native-video'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { addFilteredPosts, addPost, setPosts } from '../../store/reducers/posts'
import { getAllPosts } from '../../store/selectors/posts'
import { selectIsShown, selectTerm } from '../../store/selectors/search'
import { setTerm } from '../../store/reducers/search'
import SearchBar from '../../components/search-bar'
import Post from '../../components/post'
import { fetchPosts } from '../../server'
import { getToken } from '../../store/selectors/auth'
import PostListEmptyState from '../../components/post/post-list-empty-state'
import styles from './index.styles'
import { useScreenDimensions } from '../../helpers/hooks'

export type PageSelectedEvent = {
  nativeEvent: {
    position: number
  }
}

const MainScreen = () => {
  const dispatch = useDispatch()
  const { HEADER_HEIGHT, fullScreenHeight } = useScreenDimensions()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const posts = useSelector(getAllPosts)
  const token = useSelector(getToken)
  const searchIsShown = useSelector(selectIsShown)
  const searchTerm = useSelector(selectTerm)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [dataToShow, setDataToShow] = useState(posts.data)
  const [viewableItems, setViewableItems] = useState([])
  const videoRef = useRef<Video | null>(null)
  const availableHeight = fullScreenHeight - HEADER_HEIGHT

  const clearSearch = () => {
    dispatch(setTerm(''))
  }

  const setInitialData = async () => {
    setIsLoading(true)
    try {
      let config = {
        params: {
          page: 0,
          size: 3
        },
        headers: { Authorization: `Bearer ${token}` }
      }

      // if(searchIsShown) {
      //   config.params.
      // }

      const res = await fetchPosts(config)
      setTotalPages(res.data.totalPages)
      dispatch(setPosts(res.data.posts))
      setIsLoading(false)
    } catch (error: any) {
      if (error.response.status) {
        Alert.alert('Expired Session', 'Please login again')
        setIsLoading(false)
        return navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }]
        })
      }
      Alert.alert(error.message)
    }
  }

  const fetchNextPosts = async (customPage?: number) => {
    try {
      const res = await fetchPosts({
        params: {
          page,
          size: 3
        },
        headers: { Authorization: `Bearer ${token}` }
      })

      dispatch(addPost(res.data.posts))
    } catch (error: any) {
      Alert.alert(error.message)
      console.log('error', error)
    }
  }

  useEffect(() => {
    setInitialData().then(() => {
      setPage(page + 1)
    })
  }, [])

  useEffect(() => {
    setDataToShow(posts.data)
  }, [posts.data])

  useEffect(() => {
    if (!searchIsShown) {
      clearSearch()
    }
  }, [searchIsShown])

  useEffect(() => {
    if (searchTerm.length) {
      const filter = posts.data.filter(
        post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      dispatch(addFilteredPosts(filter))
      setDataToShow(filter)
    } else {
      setDataToShow(posts.data)
      dispatch(addFilteredPosts(posts.data))
      clearSearch()
    }
  }, [searchTerm])

  const handleSearch = (text: string) => dispatch(setTerm(text))

  const loadMorePosts = () => {
    if (page !== totalPages) {
      fetchNextPosts().then(() => {
        setPage(page + 1)
      })
    }
  }

  const onRefresh = () => {
    setIsLoading(true)
    setInitialData()
      .then(() => {
        setPage(page + 1)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setViewableItems(viewableItems.map(item => item.index))
  })

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }

  return (
    <View style={styles.container}>
      <SearchBar
        visible={searchIsShown}
        onClose={clearSearch}
        onSearch={handleSearch}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={dataToShow}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: availableHeight
              }}
            >
              <Post
                item={item}
                play={viewableItems.includes(index)}
                videoRef={videoRef}
              />
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              tintColor='#000'
              colors={['#000']}
            />
          }
          refreshing={isLoading}
          keyExtractor={item => item.postID}
          pagingEnabled
          decelerationRate='fast'
          snapToAlignment='start'
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={viewabilityConfig}
          showsVerticalScrollIndicator={false}
          snapToInterval={availableHeight}
          removeClippedSubviews
          ListEmptyComponent={<PostListEmptyState />}
          initialNumToRender={2}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  )
}

export default MainScreen
