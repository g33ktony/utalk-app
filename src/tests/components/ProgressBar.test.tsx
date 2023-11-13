import React from 'react'
import { render } from '@testing-library/react-native'
import ProgressBar from '../../components/progress-bar'
import Progress from 'react-native-progress/Bar'

jest.mock('react-native-progress/Bar', () => ({
  Bar: jest
    .fn()
    .mockImplementation(({ progress, ...props }) => (
      <mock-progress-bar progress={progress} {...props} />
    ))
}))

describe('<ProgressBar />', () => {
  it('displays the correct progress', () => {
    const receivedBytes = 50
    const totalBytes = 100
    const expectedProgress = receivedBytes / totalBytes

    const { getByText } = render(
      <ProgressBar receivedBytes={receivedBytes} totalBytes={totalBytes} />
    )

    const progressText = getByText(`${receivedBytes} / ${totalBytes}`)
    expect(progressText).toBeTruthy()

    // Check if the mock Progress.Bar was called with the correct progress
    expect(Progress.Bar).toHaveBeenCalledWith(
      expect.objectContaining({ progress: expectedProgress }),
      expect.anything()
    )
  })

  it('displays zero progress when totalBytes is zero', () => {
    render(<ProgressBar receivedBytes={0} totalBytes={0} />)

    // Check if the mock Progress.Bar was called with zero progress
    expect(Progress.Bar).toHaveBeenCalledWith(
      expect.objectContaining({ progress: 0 }),
      expect.anything()
    )
  })
})
