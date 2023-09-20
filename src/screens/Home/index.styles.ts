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
  }
})

export default styles
