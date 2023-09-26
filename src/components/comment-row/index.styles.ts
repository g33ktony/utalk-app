import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  commentInput: {
    flex: 1,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    fontSize: 16
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8
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
