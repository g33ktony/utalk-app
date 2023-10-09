import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  View
} from 'react-native'
import {
  PostT,
  addFilteredPosts,
  addPost,
  setPosts
} from '../../store/reducers/posts'
import { getAllPosts, selectFilteredPosts } from '../../store/selectors/posts'
import { selectIsShown, selectTerm } from '../../store/selectors/search'
import { setTerm } from '../../store/reducers/search'
import SearchBar from '../../components/search-bar'
import Post from '../../components/post'
import PostListEmptyState from '../../components/post/post-list-empty-state'
import { fetchPosts } from '../../server'
import styles from './index.styles'
import { getToken } from '../../store/selectors/auth'
import Video from 'react-native-video'
import ViewPager from 'react-native-pager-view'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const posts = useSelector(getAllPosts)
  const filteredData = useSelector(selectFilteredPosts)
  const token = useSelector(getToken)
  const searchIsShown = useSelector(selectIsShown)
  const searchTerm = useSelector(selectTerm)
  const { error } = posts
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [active, setActive] = useState(0)
  const [dataToShow, setDataToShow] = useState(posts.data)

  const clearSearch = () => {
    dispatch(setTerm(''))
  }

  const fetchData = async (customPage?: number) => {
    try {
      const res = await fetchPosts({
        params: {
          page: customPage ? customPage : page,
          size: 5,
          utalkUserId: 2
        },
        headers: { Authorization: `Bearer ${token}` }
      })

      setTotalPages(res.data.totalPages)
      // setPostsState([...postsState, ...res.data.posts])
      dispatch(addPost(res.data.posts))
    } catch (error) {
      Alert.alert(error.message)
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchData().then(() => {
      setPage(page + 1)
    })
  }, [])

  useEffect(() => {
    setDataToShow(posts.data)
  }, [posts.data])

  useEffect(() => {
    console.log('dataToShow', dataToShow)
    console.log('data', posts.data)
  }, [dataToShow])

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

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error)
    }
  }, [posts])

  const handleSearch = (text: string) => dispatch(setTerm(text))

  useEffect(() => {
    console.log('active', active)
    console.log('list length', posts.data.length)
    if (active === posts.data.length - 3) {
      console.log('loaded more')

      loadMorePosts()
    }
  }, [active, posts.data])

  const loadMorePosts = () => {
    if (page !== totalPages) {
      fetchData().then(() => {
        setPage(page + 1)
      })
    }
  }

  const onRefresh = () => {
    // setPostsState([])
    setPage(0)
    dispatch(setPosts([]))
    fetchData(0)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false))
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
              <Post item={item} play={index === active} />
            </View>
          ))}
        </ViewPager>
      ) : (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  )
}

export default HomeScreen
