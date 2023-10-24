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
import { useScreenDimensions } from '../../helpers/hooks'
import PlayIndicator from './play-indicator'
import Icon from 'react-native-vector-icons/FontAwesome'

global.Buffer = global.Buffer || require('buffer').Buffer

type PropsT = {
  item: PostT
  play: boolean | undefined
  videoRef: MutableRefObject<Video | null>
}

const Post = ({ item, play, videoRef }: PropsT) => {
  const dispatch = useDispatch()
  const { fullScreenHeight, insetsTop, insetsBottom, HEADER_HEIGHT } =
    useScreenDimensions()
  const availableHeight =
    fullScreenHeight - (insetsTop + insetsBottom + HEADER_HEIGHT)
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
    if (play) {
      videoRef.current?.seek(0)
    }
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
    <View style={[styles.flexContainer, { height: availableHeight }]}>
      <Media item={item} ref={videoRef} isPlaying={isPlaying} />
      <View style={styles.postContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Avatar id={deviceId} author={item.author} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          {!item.images ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
            >
              <Icon
                name='video-camera'
                color='rgba(157,157, 159, 0.7)'
                size={22}
              />
            </View>
          ) : null}
        </View>
        <TouchableOpacity onPress={playVideo} style={styles.flexContainer}>
          <PlayIndicator item={item} isPlaying={isPlaying} />
        </TouchableOpacity>
        <Text style={styles.description}>
          {formatHashtags(item.description, {}, handleSetHash)}
        </Text>
        <PostInfoBar setIsPlaying={setIsPlaying} postId={item.postID} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={115}
          style={styles.bottomRow}
        >
          <CommentRow customStyles={commentRowStyles} item={item} />
        </KeyboardAvoidingView>
      </View>
    </View>
  )
}

export default Post
