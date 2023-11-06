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
    marginBottom: 25
  },
  editProfileButton: {
    borderRadius: 21,
    borderColor: '#002677',
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  buttonText: { color: '#002677' },
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
    color: '#888',
    marginBottom: 15
  },
  logoutButton: {
    width: 100,
    padding: 15,
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    alignItems: 'center'
  }
})

export default styles
