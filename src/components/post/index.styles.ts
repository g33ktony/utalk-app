import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    padding: 8
  },
  title: {
    // flex: 1,
    color: 'white',
    fontSize: 18,
    marginBottom: 8
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    borderRadius: 5
  },
  bottomRow: {
    justifyContent: 'space-between'
  },
  commentsLikes: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  description: {
    color: 'white',
    marginBottom: 15
  }
})

export default styles
