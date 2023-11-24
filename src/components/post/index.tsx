import React, { MutableRefObject, useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native'
import { VideoRef } from 'react-native-video'
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
import DeviceInfo from 'react-native-device-info'

global.Buffer = global.Buffer || require('buffer').Buffer

type PropsT = {
  item: PostT
  playingItem: number | undefined
  videoRef: MutableRefObject<VideoRef | null>
}

const Post = ({ item, playingItem, videoRef }: PropsT) => {
  const dispatch = useDispatch()
  const { authorAvatar, fetchAuthorAvatar, isAuthorAvatarLoading } =
    useAuthorAvatar(item.authorEmail)
  const { fullScreenHeight, insetsTop, insetsBottom, HEADER_HEIGHT } =
    useScreenDimensions()
  const availableHeight =
    fullScreenHeight -
    (DeviceInfo.hasNotch()
      ? HEADER_HEIGHT
      : insetsTop + insetsBottom + HEADER_HEIGHT)
  const handleSetHash = (text: string) => {
    dispatch(setIsShown(true))
    dispatch(setTerm(text))
  }
  const [playing, setPlaying] = useState(false)

  const commentRowStyles = {
    placeholderColor: 'white',
    input: { color: 'white' }
  }

  useEffect(() => {
    fetchAuthorAvatar()
  }, [])

  useEffect(() => {
    setPlaying(playingItem === Number(item.postID))
  }, [playingItem])

  const playVideo = () => {
    setPlaying(prev => !prev)
  }

  return (
    <View style={[styles.flexContainer, { height: availableHeight }]}>
      <Media
        item={item}
        ref={videoRef}
        playingItem={playingItem}
        playing={playing}
      />
      <View style={[styles.postContainer, { height: availableHeight }]}>
        <View style={styles.row}>
          <LinearGradient
            style={styles.gradient}
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
                customStyle={styles.row}
              />
            )}
            <Text style={styles.title}>{item.title}</Text>
          </LinearGradient>
          {!item.images ? (
            <View style={styles.iconContainer}>
              <Icon
                name='video-camera'
                color='rgba(157,157, 159, 0.7)'
                size={22}
              />
            </View>
          ) : null}
        </View>
        <TouchableOpacity onPress={playVideo} style={styles.flexContainer}>
          <PlayIndicator item={item} isPlaying={playing} />
        </TouchableOpacity>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={85}
        >
          <LinearGradient
            style={styles.gradient}
            colors={['rgba(0,0,0, 0.08)', 'rgba(0,0,0, 0.65)']}
          >
            <Text style={styles.description}>
              {formatHashtags(item.description, {}, handleSetHash)}
            </Text>
            <PostInfoBar setIsPlaying={setPlaying} postId={item.postID} />
            <CommentRow customStyles={commentRowStyles} item={item} />
          </LinearGradient>
        </KeyboardAvoidingView>
      </View>
    </View>
  )
}

export default Post
