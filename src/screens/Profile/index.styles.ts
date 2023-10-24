import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: `#fff`
  },
  profileHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 25
  },
  editProfileButton: {
    padding: 10,
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    marginBottom: 15
  },
  userInfo: {
    alignItems: 'center',
    marginVertical: 20
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  email: {
    fontSize: 16,
    color: '#888'
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    alignItems: 'center'
  }
})

export default styles
