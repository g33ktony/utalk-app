import { createSlice } from '@reduxjs/toolkit'

interface DeviceState {
  id: string
}

const initialState: DeviceState = {
  id: ''
}

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceId: (state, action) => {
      state.id = action.payload
    }
  }
})

export const { setDeviceId } = deviceSlice.actions

export default deviceSlice.reducer
