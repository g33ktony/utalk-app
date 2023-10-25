import React from 'react'
import { Text, View } from 'react-native'
import Progress from 'react-native-progress/Bar'

type PropsT = {
  receivedBytes: number
  totalBytes: number
}

const ProgressBar = ({ receivedBytes, totalBytes }: PropsT) => {
  const progress = totalBytes > 0 ? receivedBytes / totalBytes : 0

  return (
    <View style={{ padding: 20 }}>
      <Progress.Bar progress={progress} width={200} />
      <Text style={{ textAlign: 'center', marginTop: 10 }}>
        {receivedBytes} / {totalBytes}
      </Text>
    </View>
  )
}

export default ProgressBar
