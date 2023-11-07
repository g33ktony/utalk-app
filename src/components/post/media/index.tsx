import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import RNFS from 'react-native-fs'
import Video, { IgnoreSilentSwitchType, VideoRef } from 'react-native-video'
import { ActivityIndicator, Image, View } from 'react-native'
import { getMedia } from '../../../api'
import { PostT } from '../../../store/reducers/posts'
import { getToken } from '../../../store/selectors/auth'
import styles from '../index.styles'

type PropsT = {
  item: PostT
  playingItem: number | undefined
  playing: boolean
}

const Media = forwardRef(
  (
    { item, playingItem, playing }: PropsT,
    ref: ForwardedRef<VideoRef | null>
  ) => {
    const token = useSelector(getToken)
    const [isLoading, setIsLoading] = useState(false)
    const [imageOrientation, setImageOrientation] = useState('')
    const [mediaInfo, setMediaInfo] = useState<{
      uri: string
      width: number
      type: string
    } | null>(null)

    const getFilePath = () => {
      const extension = item.videos ? 'mp4' : 'jpg'
      return `${RNFS.TemporaryDirectoryPath}${item.postID}.${extension}`
    }

    const getFileType = (path: string) => {
      const extension = path?.split('.')?.pop()?.toLowerCase()

      if (extension === 'jpg') {
        return 'Image'
      } else if (extension === 'mp4') {
        return 'Video'
      } else {
        return 'Unknown'
      }
    }

    const getOrientation = (width: number, height: number) => {
      if (width > height) {
        return setImageOrientation('landscape')
      } else if (height > width) {
        return setImageOrientation('portrait')
      } else {
        return setImageOrientation('square')
      }
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
          const fileType = getFileType(filePath)
          let width = 0
          if (fileType === 'Image') {
            Image.getSize(
              filePath,
              w => {
                width = w
              },
              error => {
                console.error('Failed to get image size:', error)
              }
            )
          }

          return { filePath, fileType, width }
        })
        .then(({ filePath, width, fileType }) => {
          setMediaInfo({ uri: `file://${filePath}`, width, type: fileType })
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
            const fileType = getFileType(filePath)
            let imageWidth = 0
            if (fileType === 'Image') {
              Image.getSize(
                filePath,
                (width, height) => {
                  imageWidth = width
                  getOrientation(width, height)
                },
                error => {
                  console.error('Failed to get image size:', error)
                }
              )
            }
            setMediaInfo({
              uri: `file://${filePath}`,
              width: imageWidth,
              type: fileType
            })
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

    const onVideoLoad = (event: {
      naturalSize: { width: number; height: number }
    }) => {
      const { width, height } = event.naturalSize

      getOrientation(width, height)
    }

    return (
      <View>
        {item.videos ? (
          <Video
            ref={ref}
            repeat
            onLoad={onVideoLoad}
            ignoreSilentSwitch={IgnoreSilentSwitchType.IGNORE}
            source={mediaInfo}
            paused={playingItem !== Number(item.postID) || !playing}
            playInBackground={false}
            resizeMode={imageOrientation === 'landscape' ? 'contain' : 'cover'}
            style={styles.media}
          />
        ) : (
          <FastImage
            source={{ uri: mediaInfo.uri }}
            style={styles.media}
            resizeMode={
              imageOrientation === 'landscape'
                ? FastImage.resizeMode.contain
                : FastImage.resizeMode.cover
            }
          />
        )}
      </View>
    )
  }
)

export default Media
