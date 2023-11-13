import React from 'react'
import { Image, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PlusIcon from '../../../assets/plus.square.png'
import SearchIcon from '../../../assets/binoculars.png'
import { useDispatch, useSelector } from 'react-redux'
import { setIsShown } from '../../store/reducers/search'
import styles from './index.styles'
import { selectIsShown } from '../../store/selectors/search'

const HeaderRight = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const isShown = useSelector(selectIsShown)

  const navigateToNewPost = () =>
    navigation.reset({
      index: 0,
      routes: [{ name: 'New Post' as never }]
    })
  const handleShowSearch = () => dispatch(setIsShown(!isShown))

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleShowSearch}>
        <Image
          style={styles.icon}
          source={SearchIcon}
          alt='search icon'
          testID='search-icon'
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToNewPost}>
        <Image
          style={styles.icon}
          source={PlusIcon}
          alt='new post icon'
          testID='new post icon'
        />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderRight
