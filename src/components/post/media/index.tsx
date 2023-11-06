import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import RNFS from 'react-native-fs'
import Video from 'react-native-video'
import { ActivityIndicator, Image, View } from 'react-native'
import { getMedia } from '../../../api'
import { PostT } from '../../../store/reducers/posts'
import { getToken } from '../../../store/selectors/auth'
import styles from '../index.styles'

type PropsT = {
  item: PostT
  isPlaying: boolean
}

const Media = forwardRef(
  ({ item, isPlaying }: PropsT, ref: ForwardedRef<Video | null>) => {
    console.log('isPlaying...', isPlaying, item.postID)

    const token = useSelector(getToken)
    const [isLoading, setIsLoading] = useState(false)
    const [videoWidth, setVideoWidth] = useState(0)
    const [imageWidth, setImageWidth] = useState(0)
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
            if (fileType === 'Image') {
              Image.getSize(
                filePath,
                width => {
                  setImageWidth(width)
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

    const onVideoLoad = (event: { naturalSize: { width: any } }) => {
      const { width } = event.naturalSize
      setVideoWidth(width)
    }

    return (
      <View>
        {item.videos ? (
          <Video
            ref={ref}
            repeat
            onLoad={onVideoLoad}
            ignoreSilentSwitch='ignore'
            source={mediaInfo}
            paused={!isPlaying}
            resizeMode={videoWidth > 550 ? 'contain' : 'cover'}
            style={styles.media}
          />
        ) : (
          <FastImage
            source={{ uri: mediaInfo.uri }}
            style={styles.media}
            resizeMode={
              imageWidth > 450
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
