import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator, Alert, Text, View } from 'react-native'
import { addFilteredPosts, addPost, setPosts } from '../../store/reducers/posts'
import { getAllPosts, selectFilteredPosts } from '../../store/selectors/posts'
import { selectIsShown, selectTerm } from '../../store/selectors/search'
import { setTerm } from '../../store/reducers/search'
import SearchBar from '../../components/search-bar'
import Post from '../../components/post'
import PostListEmptyState from '../../components/post/post-list-empty-state'
import { fetchPosts } from '../../server'
import styles from './index.styles'
import { getToken } from '../../store/selectors/auth'
import ViewPager from 'react-native-pager-view'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Video from 'react-native-video'
import { useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const posts = useSelector(getAllPosts)
  const filteredData = useSelector(selectFilteredPosts)
  const token = useSelector(getToken)
  const searchIsShown = useSelector(selectIsShown)
  const searchTerm = useSelector(selectTerm)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [active, setActive] = useState(0)
  const [dataToShow, setDataToShow] = useState(posts.data)
  const videoRef = useRef<Video | null>(null)

  const clearSearch = () => {
    dispatch(setTerm(''))
  }

  const setInitialData = async () => {
    try {
      const res = await fetchPosts({
        params: {
          page: 0,
          size: 5
        },
        headers: { Authorization: `Bearer ${token}` }
      })
      setTotalPages(res.data.totalPages)
      dispatch(setPosts(res.data.posts))
    } catch (error: any) {
      // if (error.response.status) {
      //   Alert.alert('Expired Session', 'Please login again')
      //   return navigation.replace('LogIn')
      // }
      Alert.alert(error.message)
    }
  }

  const fetchNextPosts = async (customPage?: number) => {
    try {
      const res = await fetchPosts({
        params: {
          page,
          size: 5
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

  useEffect(() => {
    if (active === posts.data.length - 3) {
      loadMorePosts()
    }
  }, [active, posts.data])

  const loadMorePosts = () => {
    if (page !== totalPages) {
      fetchNextPosts().then(() => {
        setPage(page + 1)
      })
    }
  }

  const onRefresh = () => {
    setInitialData().then(() => {
      setPage(page + 1)
    })
  }

  return (
    <View style={styles.container}>
      <SearchBar
        visible={searchIsShown}
        onClose={clearSearch}
        onSearch={handleSearch}
      />
      {active === 0 ? (
        <TouchableOpacity onPress={onRefresh}>
          <Text>Refresh</Text>
        </TouchableOpacity>
      ) : null}
      {dataToShow.length ? (
        <ViewPager
          onPageSelected={e => {
            setActive(e.nativeEvent.position)
          }}
          scrollEnabled
          orientation='vertical'
          style={{ flex: 1 }}
          initialPage={0}
          offscreenPageLimit={1}
          overdrag
        >
          {dataToShow.map((item, index) => (
            <View key={item.postID}>
              <Post videoRef={videoRef} item={item} play={index === active} />
            </View>
          ))}
        </ViewPager>
      ) : !isLoading ? (
        <PostListEmptyState />
      ) : (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  )
}

export default HomeScreen
