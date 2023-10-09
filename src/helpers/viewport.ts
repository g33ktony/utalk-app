import { Dimensions } from 'react-native'

export const heightByPercent = (percent: number) => {
  const windowHeight = Dimensions.get('window').height
  const multiplier = percent / 100

  return multiplier * windowHeight
}
