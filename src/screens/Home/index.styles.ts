import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  newPost: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  newPostAuthor: {
    flex: 1,
    height: 40,
    marginRight: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8
  },
  newPostImage: {
    flex: 1,
    height: 40,
    marginRight: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8
  },
  postContainer: {
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 16
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8
  },
  author: {
    fontSize: 16
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  commentInput: {
    flex: 1,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 16
  },
  sendCommentIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0'
  }
})

export default styles
