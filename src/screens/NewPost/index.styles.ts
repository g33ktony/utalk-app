import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 16,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  mediaButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 16
  },
  previewImage: {
    width: 350,
    height: 350,
    resizeMode: 'cover',
    borderRadius: 8
  },
  button: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8
  },
  navigationButton: {
    borderRadius: 21,
    borderColor: '#002677',
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  videoPlayer: {
    height: '100%',
    width: '100%'
  },
  flexContainer: {
    flex: 1
  }
})

export default styles
