import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  closeContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20
  },
  recordingTime: {
    position: 'absolute',
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  recordingIndicator: {
    height: 14,
    width: 14,
    backgroundColor: 'red',
    borderWidth: 5,
    borderRadius: 7,
    borderColor: 'red',
    marginRight: 10
  },
  timerText: {
    color: 'white'
  },
  controlsContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  cameraControls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  rightButton: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 45
  },
  captureButton: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flip: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 45
  }
})

export default styles
