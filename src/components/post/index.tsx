// import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
// import {
//   Dimensions,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   Text,
//   View
// } from 'react-native'
// import { useDispatch, useSelector } from 'react-redux'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import { PostT } from '../../store/reducers/posts'
// import formatHashtags from '../../helpers/format-hashtags'
// import { selectDeviceId } from '../../store/reducers/device'
// import { setIsShown, setTerm } from '../../store/reducers/search'
// import PostInfoBar from './post-info-bar'
// import Avatar from '../avatar'
// import CommentRow from '../comments/comment-row'
// import VideoPlayer from '../video-player'
// import styles from './index.styles'
// import { getMedia } from '../../server'
// import { getToken, getUserName } from '../../store/selectors/auth'
// import RNFS from 'react-native-fs'
// import Video from 'react-native-video'
// const { v4: uuidv4 } = require('uuid')

// global.Buffer = global.Buffer || require('buffer').Buffer

// type PropsT = {
//   item: PostT
//   play: boolean
// }

// const Post = ({ item, play }: PropsT) => {
//   const windowDimensions = Dimensions.get('window')
//   const { height } = windowDimensions
//   const insets = useSafeAreaInsets()
//   const [mediaInfo, setMediaInfo] = useState('')
//   const token = useSelector(getToken)
//   const userName = useSelector(getUserName)

//   const statusBarHeight = insets.top
//   const headerHeight = insets.top + insets.bottom

//   const dispatch = useDispatch()
//   const deviceId = useSelector(selectDeviceId)

// const handleSetHash = (text: string) => {
//   dispatch(setIsShown(true))
//   dispatch(setTerm(text))
// }

// const getFilePath = (item: PostT) => {
//   const uniqueId: string = uuidv4()
//   const source = item.images ? item.images : item.videos
//   const split = source ? source[0].split('.') : []
//   const size = split.length
//   const extension = split[size - 1]
//   const path = `${RNFS.TemporaryDirectoryPath}_${uniqueId}.${extension}`

//   return path
// }

// const handleGetMedia = () => {
//   getMedia({ postId: item.postID, token })
//     .then(res => {
//       const buffer = Buffer.from(res.data, 'binary').toString('base64')
//       const filePath = getFilePath(item)
//       return { filePath, buffer }
//     })
//     .then(async ({ filePath, buffer }) => {
//       await RNFS.writeFile(filePath, buffer, 'base64')
//       return filePath
//     })
//     .then(setMediaInfo)
//     .catch(console.log)
// }

// useEffect(() => {
//   handleGetMedia()
//   return () => setMediaInfo('')
// }, [])

//   return (
//     <View style={{ flex: 1 }}>
//       {/* {mediaInfo && item.images ? (
//         <Image
//           style={{
//             width: '100%',
//             height:
//               windowDimensions.height - headerHeight - statusBarHeight - 24 // for iphone x this only should be headerHeight - 10 for other iPhones add status bar and - 24px
//           }}
//           source={{ uri: `file://${mediaInfo}` }}
//           resizeMode='cover'
//         />
//       ) : (
//         <View
//           style={{
//             width: '100%',
//             height:
//               windowDimensions.height - headerHeight - statusBarHeight - 24 // for iphone x this only should be headerHeight - 10 for other iPhones add status bar and - 24px
//           }}
//         />
//       )} */}
//       {mediaInfo && item.videos ? (
//         <VideoPlayer
//           // ref={ref => (refs.current[index] = ref)}
//           paused={play}
//           style={{
//             width: '100%',
//             height:
//               windowDimensions.height - headerHeight - statusBarHeight - 24 // for iphone x this only should be headerHeight - 10 for other iPhones add status bar and - 24px
//           }}
//           uri={`file://${mediaInfo}`}
//         />
//       ) : (
//         <View
//           style={{
//             width: '100%',
//             height:
//               windowDimensions.height - headerHeight - statusBarHeight - 24
//           }}
//         />
//       )}
// <View
//   style={[
//     {
//       position: 'absolute',
//       // zIndex: 9000,
//       height: '100%',
//       width: '100%'
//     },
//     styles.postContainer
//   ]}
// >
//   <View style={styles.postContainer}>
//     <Avatar id={deviceId} author={item.author} />
//     <Text style={styles.title}>{item.title}</Text>
//     <Text style={styles.description}>
//       {formatHashtags(item.description, {}, handleSetHash)}
//     </Text>
//     <PostInfoBar postId={item.postID} />
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={80}
//     >
//       <CommentRow
//         customStyles={{
//           placeholderColor: 'white',
//           input: { color: 'white' }
//         }}
//         item={item}
//       />
//     </KeyboardAvoidingView>
//   </View>
// </View>
//     </View>
//   )
// }

// export default Post

import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Video from 'react-native-video'
import RNFS from 'react-native-fs'
import { PostT } from '../../store/reducers/posts'
import styles from './index.styles'
import Avatar from '../avatar'
import CommentRow from '../comments/comment-row'
import PostInfoBar from './post-info-bar'
import formatHashtags from '../../helpers/format-hashtags'
import { useDispatch, useSelector } from 'react-redux'
import { setIsShown, setTerm } from '../../store/reducers/search'
import { getMedia } from '../../server'
import { getToken } from '../../store/selectors/auth'
import { getDeviceId } from 'react-native-device-info'
global.Buffer = global.Buffer || require('buffer').Buffer

type PropsT = {
  item: PostT
  play: boolean
}

const Post = ({ item, play }: PropsT) => {
  const [mediaInfo, setMediaInfo] = useState<{ uri: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector(getToken)
  const deviceId = useSelector(getDeviceId)
  const videoRef = useRef<Video | null>(null)
  const handleSetHash = (text: string) => {
    dispatch(setIsShown(true))
    dispatch(setTerm(text))
  }
  const [isPlaying, setIsPlaying] = useState(play)

  useEffect(() => {
    setIsPlaying(play)
  }, [play])

  const getFilePath = () => {
    const extension = item.videos ? 'mp4' : 'jpg'
    return `${RNFS.TemporaryDirectoryPath}${item.postID}.${extension}`
  }

  const handleGetMediaFromServer = () => {
    // setIsLoading(true)
    getMedia({ postId: item.postID, token })
      .then(res => {
        const buffer = Buffer.from(res.data, 'binary').toString('base64')
        const filePath = getFilePath()
        return { filePath, buffer }
      })
      .then(async ({ filePath, buffer }) => {
        await RNFS.writeFile(filePath, buffer, 'base64')
        return filePath
      })
      .then(filePath => {
        setMediaInfo({ uri: `file://${filePath}` })
        // setIsLoading(false)
      })
      .catch(e => {
        // setIsLoading(false)
        console.log(e)
      })
  }

  const handleGetMedia = () => {
    const filePath = getFilePath()
    console.log('filePath', filePath)

    RNFS.exists(filePath)
      .then(exists => {
        if (exists) {
          console.log('exists', exists)

          setMediaInfo({ uri: `file://${filePath}` })
        } else {
          console.log('exists', exists)
          handleGetMediaFromServer()
        }
      })
      .catch(error => {
        console.error('Media existence check error:', error)
      })
  }

  useEffect(() => {
    handleGetMedia()
    return () => {
      if (mediaInfo && mediaInfo.uri) {
        RNFS.unlink(mediaInfo.uri).catch(error => {
          console.error('Media file deletion error:', error)
        })
      }
    }
  }, [])

  const playVideo = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        console.log('playing')
        videoRef.current.setNativeProps({ paused: false })
        setIsPlaying(true)
      } else {
        console.log('paused')
        videoRef.current.setNativeProps({ paused: true })
        setIsPlaying(false)
      }
    }
  }

  const renderMedia = () => {
    if (!mediaInfo) {
      return null
    }

    if (item.videos) {
      return (
        <Video
          ref={videoRef}
          // audioOnly
          controls
          repeat
          source={mediaInfo}
          paused={!isPlaying}
          resizeMode='cover'
          style={{ width: '100%', height: '100%' }}
        />
      )
    } else if (item.images) {
      return (
        <FastImage
          source={mediaInfo}
          style={{ width: '100%', height: '100%' }}
          resizeMode={FastImage.resizeMode.cover}
        />
      )
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {/* {!isLoading ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            console.log('tap to play/pause')
            // Handle tapping on the post (e.g., for toggling play/pause)
          }}
        >
          {renderMedia()}
        </TouchableOpacity>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator />
        </View>
      )} */}
      <View
      // activeOpacity={0.9}
      // onPress={() => {
      //   console.log('tap to play/pause')
      //   // playVideo()
      // }}
      >
        {renderMedia()}
      </View>
      <View
        style={[
          {
            position: 'absolute',
            zIndex: 9000,
            height: '100%',
            width: '100%'
          },
          styles.postContainer
        ]}
      >
        <View style={styles.postContainer}>
          <Avatar id={deviceId} author={item.author} />
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity onPress={playVideo} style={{ flex: 1 }} />
          <Text style={styles.description}>
            {formatHashtags(item.description, {}, handleSetHash)}
          </Text>
          <PostInfoBar postId={item.postID} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={125}
          >
            <CommentRow
              reload={() => {}}
              customStyles={{
                placeholderColor: 'white',
                input: { color: 'white' }
              }}
              item={item}
            />
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  )
}

export default Post
