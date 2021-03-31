import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NewPerson from './NewPerson'
import Context from '../../store/context'
import { IState } from '../../types'

describe('Test', () => {
    it('modal dialog closed initially', () => {
        render(<NewPerson />)
        expect(screen.queryByText(/new person/i)).not.toBeInTheDocument()
    })

    it('open modal', () => {
        const { getByRole } = render(<NewPerson />)

        fireEvent.click(getByRole('button'))

        expect(screen.getByText(/new person/i)).toBeInTheDocument()
        expect(screen.queryAllByText(/invalid/i)).toHaveLength(0)
    })

    it('leave every field empty', () => {
        const { getByRole } = render(<NewPerson />)

        fireEvent.click(getByRole('button'))

        Array.from({ length: 5 }).forEach((_, i) => {
            fireEvent.change(screen.getAllByRole('textbox')[i], { target: { value: '' } })
        })
        fireEvent.click(screen.getByRole('button', { name: /submit/i }))

        expect(screen.getAllByText(/invalid/i)).toHaveLength(5)
    })

    it('fill out the form correctly and submit', () => {
        const dispatch = jest.fn()

        const { getByRole } = render(<Context.Provider value={[{} as IState, dispatch]}>
            <NewPerson />
        </Context.Provider>
        )

        fireEvent.click(getByRole('button'))

        fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '1' } })
        fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'Jane' } })
        fireEvent.change(screen.getAllByRole('textbox')[2], { target: { value: 'Smith' } })
        fireEvent.change(screen.getAllByRole('textbox')[3], { target: { value: 'jane@mail.com' } })
        fireEvent.change(screen.getAllByRole('textbox')[4], { target: { value: '(000)000-0000z' } })

        fireEvent.click(screen.getByRole('button', { name: /submit/i }))

        expect(dispatch).toHaveBeenCalledTimes(1)
    })
})