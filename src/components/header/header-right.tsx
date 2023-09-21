import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View } from 'react-native'

const HeaderRight = () => {
  const navigation = useNavigation()
  return (
    <View style={{ marginRight: 15, flexDirection: 'row', gap: 10 }}>
      <TouchableOpacity onPress={() => {}}>
        <Icon size={20} name='search' />
      </TouchableOpacity>
      <TouchableOpacity
        style={{}}
        onPress={() => navigation.navigate('New Post')}
      >
        <Icon size={20} name='plus-square-o' />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderRight
