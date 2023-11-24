import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Progress from 'react-native-progress/Bar'

type PropsT = {
  receivedBytes: number
  totalBytes: number
}

const ProgressBar = ({ receivedBytes, totalBytes }: PropsT) => {
  const progress = totalBytes > 0 ? receivedBytes / totalBytes : 0

  return (
    <View style={styles.container}>
      <Progress.Bar progress={progress} width={200} />
      <Text style={styles.progress}>
        {receivedBytes} / {totalBytes}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  progress: {
    textAlign: 'center',
    marginTop: 10
  }
})

export default ProgressBar
