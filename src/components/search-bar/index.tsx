import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './index.styles'
import { useSelector } from 'react-redux'
import { selectTerm } from '../../store/selectors/search'

type SearchBarProps = {
  onSearch: (searchText: string) => void
  onClearInput: () => void
  visible: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  visible,
  onClearInput
}) => {
  const searchTerm = useSelector(selectTerm)
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
            value={searchTerm}
          />
          <TouchableOpacity onPress={onClearInput}>
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
