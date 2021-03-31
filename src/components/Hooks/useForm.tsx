import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { checkErrors, getValidationErrors } from '../../utils'
import { IFormValues, IValidationSchema } from '../../types'


const init = <IValues extends IFormValues>({ initialValues }: {
    initialValues: IValues
}) => {
    const errors = getValidationErrors(initialValues)

    return {
        values: initialValues,
        errors
    }
}

function useForm<IValues extends IFormValues>({ initialValues, validationSchema, onSubmit }: {
    initialValues: IValues,
    validationSchema?: IValidationSchema<IValues>,
    onSubmit: (values: IValues) => void
}) {
    const initialState = useRef(init({ initialValues }))
    const [{ values, errors }, setState] = useState(initialState.current)

    const resetForm = () => setState(initialState.current)

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
        setState(state => ({
            ...state,
            values: {
                ...state.values,
                [name]: value
            }
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const errors = getValidationErrors(values, validationSchema)

        const isValid = checkErrors(errors)

        if (isValid) {
            onSubmit(values)
            setState(initialState.current)
        }
        else {
            setState(state => ({ ...state, errors }))
        }
    }

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        resetForm
    }
}

export default useForm