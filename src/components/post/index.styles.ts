import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  postContainer: {
    position: 'absolute',
    zIndex: 9000,
    height: '100%',
    width: '100%'
  },
  title: {
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
    marginBottom: 10
  },
  commentsLikes: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  description: {
    fontSize: 18,
    color: 'white',
    marginBottom: 15
  },
  media: {
    width: '100%',
    height: '100%'
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default styles
