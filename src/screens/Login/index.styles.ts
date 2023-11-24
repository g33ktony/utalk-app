import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    marginBottom: 45
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  button: {
    justifyContent: 'center',
    width: 150,
    backgroundColor: '#ce4817',
    borderColor: '#ce4817',
    borderRadius: 21,
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 25
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  toggleButton: {
    justifyContent: 'center',
    borderRadius: 21,
    borderColor: '#002677',
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 12
  }
})

export default styles
