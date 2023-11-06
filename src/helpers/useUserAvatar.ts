import RNFS from 'react-native-fs'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAvatar } from '../store/reducers/auth'
import {
  getUserAvatar as getAvatarFromStore,
  getToken
} from '../store/selectors/auth'
import { getAvatar } from '../api'
import { Alert } from 'react-native'
import { useState } from 'react'

const useUserAvatar = (username: string) => {
  const [isAvatarLoading, setIsAvatarLoading] = useState(false)
  const dispatch = useDispatch()
  const userAvatar = useSelector(getAvatarFromStore)
  const token = useSelector(getToken)

  const getUserAvatarFilePath = () => {
    return `${RNFS.TemporaryDirectoryPath}${username}.jpg`
  }

  const writeAvatarFile = async (filePath: string, buffer: string) => {
    try {
      await RNFS.writeFile(filePath, buffer, 'base64')
      dispatch(setUserAvatar(filePath))
    } catch (error) {}
  }

  const fetchUserAvatar = async (paramToken?: string) => {
    setIsAvatarLoading(true)
    try {
      const avatarRes = await getAvatar(paramToken ? paramToken : token)

      const buffer = Buffer.from(avatarRes.data, 'binary').toString('base64')
      const filePath = getUserAvatarFilePath()
      if (!filePath) {
        return dispatch(setUserAvatar(filePath))
      }
      writeAvatarFile(filePath, buffer)
    } catch (error) {
      Alert.alert(
        'Cannot get Avatar',
        'We cannot get your avatar, make sure you have set '
      )
    } finally {
      setIsAvatarLoading(false)
    }
  }

  return {
    getUserAvatarFilePath,
    writeAvatarFile,
    userAvatar,
    fetchUserAvatar,
    isAvatarLoading
  }
}

export default useUserAvatar
