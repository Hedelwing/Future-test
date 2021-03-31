import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import UserCard from './UserCard'

it('component was rendered and scrollIntoView was called', () => {
    const JamesBond = { firstName: "James", lastName: "Bond", description: "Agent 007" }

    const scrollIntoViewMock = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

    const { getByText } = render(<UserCard person={JamesBond} />)

    expect(getByText(/james bond/i)).toBeInTheDocument()
    fireEvent.click(getByText(/james bond/i))
    expect(scrollIntoViewMock).toBeCalled()
})