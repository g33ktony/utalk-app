import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import Avatar from '../avatar'
import PostInfoBar from '../post-info-bar'
import { PostT } from '../../store/reducers/posts'
import formatHashtags from '../../helpers/format-hashtags'
import CommentRow from '../comment-row'
import { useDispatch, useSelector } from 'react-redux'
import { selectDeviceId } from '../../store/reducers/device'
import styles from './index.styles'
import { setIsShown, setTerm } from '../../store/reducers/search'
import VideoPlayer from '../video-player'

type PropsT = {
  item: PostT
}

const Post = ({ item }: PropsT) => {
  const dispatch = useDispatch()
  const deviceId = useSelector(selectDeviceId)
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const handleOpenDrawer = (openState: boolean) => setDrawerOpen(!openState)

  const handleSetHash = (text: string) => {
    dispatch(setIsShown(true))
    dispatch(setTerm(text))
  }

  return (
    <View style={styles.postContainer}>
      <View>
        <Avatar id={deviceId} author={item.author} />
        <Text style={styles.title}>
          {formatHashtags(item.title, styles.title, handleSetHash)}
        </Text>
        {item.image ? (
          <Image style={styles.postImage} source={{ uri: item.image }} />
        ) : null}
        {item.video ? <VideoPlayer uri={item.video} /> : null}
        <Text style={styles.description}>
          {formatHashtags(item.description, {}, handleSetHash)}
        </Text>
      </View>
      <PostInfoBar
        isDrawerOpen={isDrawerOpen}
        setDrawerOpen={handleOpenDrawer}
        postId={item.id}
      />
      <CommentRow item={item} />
    </View>
  )
}

export default Post
