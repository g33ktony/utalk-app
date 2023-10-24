import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import RNFS from 'react-native-fs'
import Video from 'react-native-video'
import { ActivityIndicator, View } from 'react-native'
import { getMedia } from '../../../api'
import { PostT } from '../../../store/reducers/posts'
import { getToken } from '../../../store/selectors/auth'
import styles from '../index.styles'
import { useScreenDimensions } from '../../../helpers/hooks'

type PropsT = {
  item: PostT
  isPlaying: boolean
}

const Media = forwardRef(
  ({ item, isPlaying }: PropsT, ref: ForwardedRef<Video | null>) => {
    const token = useSelector(getToken)
    const [isLoading, setIsLoading] = useState(false)
    const [mediaInfo, setMediaInfo] = useState<{ uri: string } | null>(null)
    const { fullScreenHeight, insetsTop, insetsBottom, HEADER_HEIGHT } =
      useScreenDimensions()
    const availableHeight =
      fullScreenHeight - (insetsTop + insetsBottom + HEADER_HEIGHT)

    const getFilePath = () => {
      const extension = item.videos ? 'mp4' : 'jpg'
      return `${RNFS.TemporaryDirectoryPath}${item.postID}.${extension}`
    }

    const handleGetMediaFromServer = () => {
      setIsLoading(true)
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
          setIsLoading(false)
        })
        .catch(e => {
          setIsLoading(false)
          console.log(e)
        })
    }

    const handleGetMedia = () => {
      const filePath = getFilePath()

      RNFS.exists(filePath)
        .then(exists => {
          if (exists) {
            setMediaInfo({ uri: `file://${filePath}` })
          } else {
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
        if (ref && 'current' in ref) {
          ref.current?.seek(0)
        }
      }
    }, [])

    if (!mediaInfo) {
      return null
    }

    if (isLoading) {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View>
        {item.videos ? (
          <Video
            ref={ref}
            repeat
            poster='https://www.icloud.com/iclouddrive/0a5KhwqS8Q2lbHrkvJPapn-1w#logo.jpg'
            posterResizeMode='cover'
            ignoreSilentSwitch='ignore'
            source={mediaInfo}
            paused={!isPlaying}
            resizeMode='cover'
            style={styles.media}
          />
        ) : (
          <FastImage
            source={mediaInfo}
            style={styles.media}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
      </View>
    )
  }
)

export default Media
