import React from 'react'
import { render } from '@testing-library/react-native'
import Avatar from '../../components/avatar'
import styles from '../../components/avatar/index.styles'

describe('<Avatar />', () => {
  it('renders an image when a path is provided', () => {
    const { getByTestId } = render(<Avatar path='mobile/assets/logo.png' />)
    expect(getByTestId('image-avatar')).toBeTruthy()
  })

  it('renders a generated avatar when no path is provided', () => {
    const { getByTestId } = render(<Avatar author='John Doe' />)
    expect(getByTestId('generated-avatar')).toBeTruthy()
  })

  it('displays the author name when justAvatar is false', () => {
    const { getByText } = render(
      <Avatar author='John Doe' justAvatar={false} />
    )
    expect(getByText('John Doe')).toBeTruthy()
  })

  it('does not display the author name when justAvatar is true', () => {
    const { queryByText } = render(
      <Avatar author='John Doe' justAvatar={true} />
    )
    expect(queryByText('John Doe')).toBeNull()
  })

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'blue' }
    const { getByTestId } = render(<Avatar customStyle={customStyle} />)
    expect(getByTestId('avatar-container').props.style).toMatchObject([
      styles.authorRow,
      customStyle
    ])
  })
})
