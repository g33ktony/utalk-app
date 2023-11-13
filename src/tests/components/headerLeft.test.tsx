import React from 'react'
import { render } from '@testing-library/react-native'
import HeaderLeft from '../../components/header/header-left'

describe('<HeaderLeft />', () => {
  it('renders the logo and beta text', () => {
    const { getByTestId, getByText } = render(<HeaderLeft />)

    const logoImage = getByTestId('logo-image')
    expect(logoImage.props.source).toEqual(require('../../../assets/logo.png'))

    const betaText = getByText('beta')
    expect(betaText).toBeTruthy()
  })
})
