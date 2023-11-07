import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  View,
  RefreshControl
} from 'react-native'
import { VideoRef } from 'react-native-video'
import { useNavigation } from '@react-navigation/native'
import { addFilteredPosts, addPost, setPosts } from '../../store/reducers/posts'
import { getAllPosts } from '../../store/selectors/posts'
import { selectIsShown, selectTerm } from '../../store/selectors/search'
import { setIsShown, setTerm } from '../../store/reducers/search'
import SearchBar from '../../components/search-bar'
import Post from '../../components/post'
import { fetchPosts } from '../../api'
import { getToken } from '../../store/selectors/auth'
import PostListEmptyState from '../../components/post/post-list-empty-state'
import styles from './index.styles'

export type PageSelectedEvent = {
  nativeEvent: {
    position: number
  }
}

type ViewableItem = {
  index: number | null
}

const MainScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const posts = useSelector(getAllPosts)
  const token = useSelector(getToken)
  const searchIsShown = useSelector(selectIsShown)
  const searchTerm = useSelector(selectTerm)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [dataToShow, setDataToShow] = useState(posts.data)
  const videoRef = useRef<VideoRef | null>(null)
  const [visibleItem, setVisibleItem] = useState<number>()

  const clearSearch = () => {
    dispatch(setTerm(''))
  }

  const setInitialData = async (hashTag?: string) => {
    setIsLoading(true)
    try {
      let config: {
        params: { page: number; size: number; hashtags?: string }
        headers: Record<string, string>
      } = {
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
          routes: [{ name: 'LogIn' as never }]
        })
      }
      Alert.alert(error.message)
    }
  }

  const fetchNextPosts = async (hashTag?: string) => {
    try {
      let config: {
        params: { page: number; size: number; hashtags?: string }
        headers: Record<string, string>
      } = {
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

  const [timer, setTimer] = useState<number | null>(null)

  const handleSearch = (text: string) => {
    if (timer) {
      clearTimeout(timer)
    }

    const newTimer = setTimeout(() => {
      dispatch(setTerm(text))
    }, 500) as unknown as number

    setTimer(newTimer)
  }

  const loadMorePosts = () => {
    if (page !== totalPages) {
      fetchNextPosts(searchTerm).then(() => {
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
    dispatch(setIsShown(false))
  }

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems[0].key) {
      setVisibleItem(viewableItems[0]?.key || -1)
    }
  }, [])

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
    waitForInteraction: false
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
          renderItem={({ item }) => {
            return (
              <Post item={item} playingItem={visibleItem} videoRef={videoRef} />
            )
          }}
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
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          keyboardShouldPersistTaps='always'
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
