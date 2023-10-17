import { Dimensions, Platform } from 'react-native'
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
