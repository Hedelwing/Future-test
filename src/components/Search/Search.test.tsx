import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Search from './Search'
import Context from '../../store/context'
import { IState } from '../../types'

it('Test search input', () => {
    const dispatch = jest.fn()

    const { getByPlaceholderText, getByTestId } = render(<Context.Provider value={[{} as IState, dispatch]}>
        <Search />
    </Context.Provider>
    )

    const searchInput = getByPlaceholderText(/search/i)

    expect(searchInput).toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: 'James Bond' } })

    expect(searchInput).toHaveValue('James Bond')

    fireEvent.submit(getByTestId('search'))

    expect(dispatch).toBeCalled()
    expect(searchInput).toHaveValue('')
})