import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#fff`,
    alignItems: 'center',
    justifyContent: 'center'
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  postImage: {
    marginBottom: 5
  },
  postLikes: {
    fontSize: 14,
    color: 'green',
    marginBottom: 5
  },
  postComments: {
    fontSize: 14,
    color: 'blue',
    marginBottom: 10
  },
  comment: {
    marginBottom: 10
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5
  },
  newComment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#eee',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  newCommentAuthor: {
    flex: 1,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  newCommentText: {
    flex: 1,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  }
})

export default styles
