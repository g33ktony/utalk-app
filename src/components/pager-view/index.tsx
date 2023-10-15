import React, { MutableRefObject } from 'react'
import { ActivityIndicator, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import Post from '../post'
import { PostT } from '../../store/reducers/posts'
import { Reference } from '@apollo/client'
import Video from 'react-native-video'
import { PageSelectedEvent } from './types'
import styles from './index.styles'

type PropsT = {
  isLoading: boolean
  handlePageSelected: (event: PageSelectedEvent) => void
  data: PostT[]
  ref: MutableRefObject<Video | null>
  active: number
}

const Pager = ({
  isLoading,
  handlePageSelected,
  data,
  ref,
  active
}: PropsT) => {
  return (
    <>
      {!isLoading ? (
        <PagerView
          onPageSelected={handlePageSelected}
          scrollEnabled
          orientation='vertical'
          style={styles.pager}
          initialPage={0}
          offscreenPageLimit={1}
        >
          {data.map((item: PostT, index: number) => (
            <View key={item.postID}>
              <Post videoRef={ref} item={item} play={index === active} />
            </View>
          ))}
        </PagerView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      )}
    </>
  )
}

export default Pager
