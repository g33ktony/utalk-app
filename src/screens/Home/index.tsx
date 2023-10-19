import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  View,
  RefreshControl
} from 'react-native'
import Video from 'react-native-video'
import { useNavigation } from '@react-navigation/native'
import { addFilteredPosts, addPost, setPosts } from '../../store/reducers/posts'
import { getAllPosts } from '../../store/selectors/posts'
import { selectIsShown, selectTerm } from '../../store/selectors/search'
import { setTerm } from '../../store/reducers/search'
import SearchBar from '../../components/search-bar'
import Post from '../../components/post'
import { fetchPosts } from '../../api'
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

  const setInitialData = async (hashTag?: string) => {
    setIsLoading(true)
    try {
      let config = {
        params: {
          page: 0,
          size: 2
        },
        headers: { Authorization: `Bearer ${token}` }
      }

      if (hashTag) {
        config.params.hashtags = hashTag
      } else {
        clearSearch()
      }

      const res = await fetchPosts(config)
      setTotalPages(res.data.totalPages)
      setPage(1)
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

  const fetchNextPosts = async (hashTag?: string) => {
    try {
      let config = {
        params: {
          page,
          size: 2
        },
        headers: { Authorization: `Bearer ${token}` }
      }
      if (hashTag) {
        config.params.hashtags = hashTag
      }
      const res = await fetchPosts(config)

      dispatch(addPost(res.data.posts))
    } catch (error: any) {
      Alert.alert(error.message)
    }
  }

  useEffect(() => {
    setInitialData()
  }, [])

  useEffect(() => {
    setDataToShow(posts.data)
  }, [posts.data])

  useEffect(() => {
    if (!searchIsShown) {
      onClearInput()
    }
  }, [searchIsShown])

  useEffect(() => {
    if (searchTerm.length) {
      setInitialData(searchTerm)
    } else {
      setDataToShow(posts.data)
      dispatch(addFilteredPosts(posts.data))
      clearSearch()
    }
  }, [searchTerm])

  const handleSearch = (text: string) => {
    dispatch(setTerm(text))
  }

  const loadMorePosts = () => {
    if (page !== totalPages) {
      fetchNextPosts(searchTerm ? searchTerm : undefined).then(() => {
        setPage(page => page + 1)
      })
    }
  }

  const onRefresh = () => {
    setIsLoading(true)
    setInitialData()
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }

  const onClearInput = () => {
    clearSearch()
    setInitialData()
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
        onClearInput={onClearInput}
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
