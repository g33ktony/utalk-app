import { useState, useEffect, useCallback, useMemo } from 'react'
import { Dimensions, Platform, AppState, AppStateStatus } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import { CameraDevice, useCameraDevices } from 'react-native-vision-camera'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const useScreenDimensions = () => {
  const { height: fullScreenHeight, width: fullScreenWidth } =
    Dimensions.get('window')
  const insets = useSafeAreaInsets()
  let HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56

  if (Platform.OS === 'ios' && insets.top > 24) {
    HEADER_HEIGHT += insets.top
  }

  return {
    fullScreenHeight,
    fullScreenWidth,
    HEADER_HEIGHT,
    insetsTop: insets.top,
    insetsBottom: insets.bottom,
    heightByPercent: (percent: number) => (percent / 100) * fullScreenHeight,
    widthByPercent: (percent: number) => (percent / 100) * fullScreenWidth
  }
}

export const useIsForeground = (): boolean => {
  const [isForeground, setIsForeground] = useState(true)

  useEffect(() => {
    const onChange = (state: AppStateStatus): void => {
      setIsForeground(state === 'active')
    }
    const listener = AppState.addEventListener('change', onChange)
    return () => listener.remove()
  }, [setIsForeground])

  return isForeground
}

export function usePreferredCameraDevice(): [
  CameraDevice | undefined,
  (device: CameraDevice) => void
] {
  const [preferredDeviceId, setPreferredDeviceId] = useMMKVString(
    'camera.preferredDeviceId'
  )

  const set = useCallback(
    (device: CameraDevice) => {
      setPreferredDeviceId(device.id)
    },
    [setPreferredDeviceId]
  )

  const devices = useCameraDevices()
  const device = useMemo(
    () => devices.find(d => d.id === preferredDeviceId),
    [devices, preferredDeviceId]
  )

  return [device, set]
}
