import React, { useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import CodePush from 'react-native-code-push'
import DeviceInfo from 'react-native-device-info'

const useAppVersion = () => {
  const appVersion = DeviceInfo.getVersion()
  const [codePushVersion, setCodePushVersion] = useState('')
  useEffect(() => {
    CodePush.getUpdateMetadata().then(update => {
      if (update) {
        setCodePushVersion(update.label)
      }
    })
  }, [])

  const appVersionComponent = (
    <Text style={styles.text}>
      App Version: {appVersion} {codePushVersion ? `(${codePushVersion})` : ''}
    </Text>
  )

  return { appVersionComponent, appVersion, codePushVersion }
}

const styles = StyleSheet.create({
  text: {
    color: 'rgba(0, 0, 0, 0.3)'
  }
})

export default useAppVersion
