import React, { MutableRefObject, useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native'
import Video from 'react-native-video'
import { PostT } from '../../store/reducers/posts'
import styles from './index.styles'
import Avatar from '../avatar'
import CommentRow from '../comments/comment-row'
import PostInfoBar from './post-info-bar'
import formatHashtags from '../../helpers/format-hashtags'
import { useDispatch } from 'react-redux'
import { setIsShown, setTerm } from '../../store/reducers/search'
import Media from './media'
import { useScreenDimensions } from '../../helpers/hooks'
import PlayIndicator from './play-indicator'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import useAuthorAvatar from '../../helpers/useAuthorAvatar'

global.Buffer = global.Buffer || require('buffer').Buffer

type PropsT = {
  item: PostT
  play: boolean | undefined
  videoRef: MutableRefObject<Video | null>
}

const Post = ({ item, play, videoRef }: PropsT) => {
  const dispatch = useDispatch()
  const { authorAvatar, fetchAuthorAvatar, isAuthorAvatarLoading } =
    useAuthorAvatar(item.authorEmail)
  const { fullScreenHeight, insetsTop, insetsBottom, HEADER_HEIGHT } =
    useScreenDimensions()
  const availableHeight =
    fullScreenHeight - (insetsTop + insetsBottom + HEADER_HEIGHT)
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
    fetchAuthorAvatar()
  }, [])

  useEffect(() => {
    if (play) {
      setIsPlaying(true)
      videoRef.current?.seek(0)
    } else {
      setIsPlaying(false)
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
          <LinearGradient
            style={{ width: '100%', padding: 16 }}
            colors={['rgba(0,0,0, 0.65)', 'rgba(0,0,0, 0.08)']}
          >
            {isAuthorAvatarLoading ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8
                }}
              >
                <ActivityIndicator />
              </View>
            ) : (
              <Avatar
                author={item.authorUsername}
                path={authorAvatar}
                customStyle={{ flexDirection: 'row' }}
              />
            )}
            <Text style={styles.title}>{item.title}</Text>
          </LinearGradient>
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
        <LinearGradient
          style={{ width: '100%', padding: 16 }}
          colors={['rgba(0,0,0, 0.08)', 'rgba(0,0,0, 0.65)']}
        >
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
        </LinearGradient>
      </View>
    </View>
  )
}

export default Post
