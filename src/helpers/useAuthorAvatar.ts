import RNFS from 'react-native-fs'
import { useSelector } from 'react-redux'
import { getToken } from '../store/selectors/auth'
import { getAvatar } from '../api'
import { Alert } from 'react-native'
import { useState } from 'react'

const useAuthorAvatar = (username: string) => {
  const [isAuthorAvatarLoading, setIsAuthorAvatarLoading] = useState(false)
  const [authorAvatar, setAuthorAvatar] = useState('')
  const token = useSelector(getToken)

  const getUserAuthorFilePath = () => {
    return `${RNFS.TemporaryDirectoryPath}${username}.jpg`
  }

  const writeAvatarFile = async (filePath: string, buffer: string) => {
    try {
      await RNFS.writeFile(filePath, buffer, 'base64')
      setAuthorAvatar(filePath)
    } catch (error) {}
  }

  const checkFileExists = async (filePath: string): Promise<boolean> => {
    try {
      const fileExists = await RNFS.exists(filePath)
      return fileExists
    } catch (error) {
      console.error('Error checking file existence', error)
      return false
    }
  }

  const fetchAuthorAvatar = async () => {
    setIsAuthorAvatarLoading(true)
    try {
      const filePath = getUserAuthorFilePath()
      const exists = await checkFileExists(filePath)
      if (exists) {
        setAuthorAvatar(filePath)
      } else {
        const avatarRes = await getAvatar(token, username)

        const buffer = Buffer.from(avatarRes.data, 'binary').toString('base64')
        if (!filePath) {
          return setAuthorAvatar(filePath)
        }
        writeAvatarFile(filePath, buffer)
      }
    } catch (error) {
      console.log('error', 'no avatar')
    } finally {
      setIsAuthorAvatarLoading(false)
    }
  }

  return {
    getUserAuthorFilePath,
    writeAvatarFile,
    authorAvatar,
    fetchAuthorAvatar,
    isAuthorAvatarLoading
  }
}

export default useAuthorAvatar
