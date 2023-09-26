import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { setIsShown } from '../../store/reducers/search'
import styles from './index.styles'

type SearchBarProps = {
  onSearch: (searchText: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <Icon name='search' size={20} color='gray' style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder='Search...'
        onChangeText={text => onSearch(text)}
      />
      <TouchableOpacity onPress={() => dispatch(setIsShown(false))}>
        <Icon name='close' size={15} color='gray' style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar
