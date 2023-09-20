import React, { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

type SearchBarProps = {
  onSearch: (searchText: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>('')

  const handleSearch = () => {
    onSearch(searchText)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Search...'
        onChangeText={text => setSearchText(text)}
        value={searchText}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Icon name='search' size={20} color='gray' style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15
  },
  input: {
    flex: 1,
    height: 40
  },
  searchIcon: {
    marginLeft: 10
  }
})

export default SearchBar
