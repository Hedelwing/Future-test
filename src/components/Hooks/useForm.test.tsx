import { act, renderHook } from '@testing-library/react-hooks'
import { ChangeEvent, FormEvent } from 'react'
import useForm from './useForm'

describe('useForm', () => {
    const initialValues = { mock: '' }
    const onSubmit = jest.fn(values => values)

    afterEach(() => {
        onSubmit.mockClear()
    })

    it('without validation', () => {
        const changedValues = { mock: 'fake', hello: 'world' }

        const { result } = renderHook(() => useForm({
            initialValues,
            onSubmit
        }))

        act(() => {
            result.current.handleChange({ target: { name: 'mock', value: 'fake' } } as ChangeEvent<HTMLInputElement>)
            result.current.handleChange({ target: { name: 'hello', value: 'world' } } as ChangeEvent<HTMLInputElement>)
        })

        expect(result.current.values).toEqual(changedValues)

        act(() => {
            result.current.handleSubmit({ preventDefault: () => { } } as FormEvent<HTMLFormElement>)
        })

        expect(onSubmit).toHaveBeenCalledWith(changedValues)
        expect(result.current.values).toEqual(initialValues)
    })

    it('with failed validation', () => {
        const changedValues = { mock: 'fake' }

        const { result } = renderHook(() => useForm({
            initialValues,
            validationSchema: {
                mock: [/^\d+$/, 'only numbers']
            },
            onSubmit
        }))

        act(() => {
            result.current.handleChange({ target: { name: 'mock', value: 'fake' } } as ChangeEvent<HTMLInputElement>)
        })

        expect(result.current.values).toEqual(changedValues)

        act(() => {
            result.current.handleSubmit({ preventDefault: () => { } } as FormEvent<HTMLFormElement>)
        })

        expect(onSubmit).not.toBeCalled()
        expect(result.current.errors.mock).toBe('only numbers')
    })

    it('with successed validation', () => {
        const changedValues = { mock: '404' }

        const { result } = renderHook(() => useForm({
            initialValues,
            validationSchema: {
                mock: [/\d/, 'only numbers']
            },
            onSubmit
        }))

        act(() => {
            result.current.handleChange({ target: { name: 'mock', value: '404' } } as ChangeEvent<HTMLInputElement>)
        })

        expect(result.current.values).toEqual(changedValues)

        act(() => {
            result.current.handleSubmit({ preventDefault: () => { } } as FormEvent<HTMLFormElement>)
        })

        expect(onSubmit).toBeCalled()
        expect(result.current.errors.mock).toBeUndefined()
        expect(result.current.values).toEqual(initialValues)
    })
})