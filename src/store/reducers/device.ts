// import { createSlice } from '@reduxjs/toolkit'

// interface DeviceState {
//   id: string
// }

// const initialState: DeviceState = {
//   id: ''
// }

// const deviceSlice = createSlice({
//   name: 'device',
//   initialState,
//   reducers: {
//     setDeviceId: (state, action) => {
//       state.id = action.payload
//     }
//   }
// })

// export const { setDeviceId } = deviceSlice.actions

// export default deviceSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface DeviceState {
  deviceId: string | null
}

const initialState: DeviceState = {
  deviceId: null
}

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceId: (state, action: PayloadAction<string | null>) => {
      state.deviceId = action.payload
    }
  }
})

export const { setDeviceId } = deviceSlice.actions
export const selectDeviceId = (state: { device: DeviceState }) =>
  state.device.deviceId
export default deviceSlice.reducer
