import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 16,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 5
  },
  title: {
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
    marginBottom: 15
  }
})

export default styles
