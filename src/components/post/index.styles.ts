import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    padding: 16,
    position: 'absolute',
    zIndex: 9000,
    height: '100%',
    width: '100%'
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
  },
  media: {
    width: '100%',
    height: '100%'
  },
  flexContainer: {
    flex: 1
  }
})

export default styles
