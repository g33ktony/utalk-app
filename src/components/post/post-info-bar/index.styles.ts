import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  bottomRow: {
    justifyContent: 'space-between'
  },
  commentsLikes: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  likeButton: {
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  like: {
    marginRight: 8,
    color: 'white'
  },
  likeText: {
    fontSize: 16,
    color: 'white'
  },
  commentIcon: {
    marginRight: 8,
    color: 'white'
  },
  commentText: {
    fontSize: 16,
    flex: 1,
    color: 'white'
  },
  viewAll: {
    fontSize: 16,
    color: 'white'
  }
})

export default styles
