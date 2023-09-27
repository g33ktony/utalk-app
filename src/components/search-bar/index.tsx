import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { setIsShown } from '../../store/reducers/search'
import styles from './index.styles'

type SearchBarProps = {
  onSearch: (searchText: string) => void
  visible: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, visible }) => {
  const dispatch = useDispatch()

  const onClose = () => dispatch(setIsShown(false))
  const onChange = (text: string) => onSearch(text)

  return (
    <>
      {visible ? (
        <View style={styles.container}>
          <Icon
            name='search'
            size={20}
            color='gray'
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder='Search...'
            onChangeText={onChange}
          />
          <TouchableOpacity onPress={onClose}>
            <Icon
              name='close'
              size={15}
              color='gray'
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  )
}

export default SearchBar
