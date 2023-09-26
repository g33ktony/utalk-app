import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface DeviceState {
  deviceId: string | undefined
}

const initialState: DeviceState = {
  deviceId: ''
}

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceId: (state, action: PayloadAction<string | undefined>) => {
      state.deviceId = action.payload
    }
  }
})

export const { setDeviceId } = deviceSlice.actions
export const selectDeviceId = (state: { device: DeviceState }) =>
  state.device.deviceId
export default deviceSlice.reducer
