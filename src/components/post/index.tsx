import React, { MutableRefObject, useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import Video from 'react-native-video'
import { PostT } from '../../store/reducers/posts'
import styles from './index.styles'
import Avatar from '../avatar'
import CommentRow from '../comments/comment-row'
import PostInfoBar from './post-info-bar'
import formatHashtags from '../../helpers/format-hashtags'
import { useDispatch, useSelector } from 'react-redux'
import { setIsShown, setTerm } from '../../store/reducers/search'
import { getDeviceId } from 'react-native-device-info'
import Media from './media'
global.Buffer = global.Buffer || require('buffer').Buffer

type PropsT = {
  item: PostT
  play: boolean
  videoRef: MutableRefObject<Video | null>
}

const Post = ({ item, play, videoRef }: PropsT) => {
  const dispatch = useDispatch()
  const deviceId = useSelector(getDeviceId)
  const handleSetHash = (text: string) => {
    dispatch(setIsShown(true))
    dispatch(setTerm(text))
  }
  const [isPlaying, setIsPlaying] = useState(play)

  const commentRowStyles = {
    placeholderColor: 'white',
    input: { color: 'white' }
  }

  useEffect(() => {
    setIsPlaying(play)
  }, [play])

  const playVideo = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        setIsPlaying(true)
      } else {
        setIsPlaying(false)
      }
    }
  }

  return (
    <View style={styles.flexContainer}>
      <Media item={item} ref={videoRef} isPlaying={isPlaying} />
      <View style={styles.postContainer}>
        <Avatar id={deviceId} author={item.author} />
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity onPress={playVideo} style={styles.flexContainer} />
        <Text style={styles.description}>
          {formatHashtags(item.description, {}, handleSetHash)}
        </Text>
        <PostInfoBar postId={item.postID} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={90}
        >
          <CommentRow customStyles={commentRowStyles} item={item} />
        </KeyboardAvoidingView>
      </View>
    </View>
  )
}

export default Post
