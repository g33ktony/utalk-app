import { RootState } from '..'
import { selectAllPosts } from './posts'

export const getDeviceId = (state: RootState) => state.device.deviceId
