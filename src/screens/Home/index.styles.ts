import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  postList: {
    flex: 1
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  pager: {
    flex: 1
  }
})

export default styles
