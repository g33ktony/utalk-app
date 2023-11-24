import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    flexDirection: 'row',
    gap: 10
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerLeft: {
    marginLeft: 15,
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'cover'
  },
  betaText: {
    marginTop: 10,
    marginLeft: -10
  }
})

export default styles
