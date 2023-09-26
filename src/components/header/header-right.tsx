import React from 'react'
import { Image, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PlusIcon from '../../../assets/plus.square.png'
import SearchIcon from '../../../assets/binoculars.png'
import { useDispatch } from 'react-redux'
import { setIsShown } from '../../store/reducers/search'
import styles from './index.styles'

const HeaderRight = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const navigateToNewPost = () => navigation.navigate('New Post')
  const handleShowSearch = () => dispatch(setIsShown(true))

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleShowSearch}>
        <Image style={styles.icon} source={SearchIcon} alt='search icon' />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToNewPost}>
        <Image style={styles.icon} source={PlusIcon} alt='new post icon' />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderRight
