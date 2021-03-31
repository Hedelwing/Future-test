import { AddRounded } from "@material-ui/icons"
import { Box, Button, Dialog, TextField, Typography, IconButton } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { Context } from "../../store/context"
import { ADD_PERSON } from "../../store/actions"
import useForm from "../Hooks/useForm"

const initialValues = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
}

const NewPerson = () => {
    const [open, setOpen] = useState(false)

    const { handleChange, values, handleSubmit, errors, resetForm } = useForm({
        initialValues: initialValues,
        validationSchema: {
            id: [/^\d+$/, "Invalid: must contains only numbers"],
            firstName: [/^[а-яёa-z]+$/i, "Invalid: must contains only words"],
            lastName: [/^[а-яёa-z]+$/i, "Invalid: must contains only words"],
            email: [/^\S+@\S+\.\S+$/, "Invalid: incorrect email"],
            phone: [/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}/, "Invalid: expect (XXX)XXX-XXXX format"]
        },
        onSubmit: (values) => {
            dispatch({ type: ADD_PERSON, payload: { ...values, id: +values.id } })
            setOpen(false)
        }
    })

    const [, dispatch] = useContext(Context)

    return <>
        <IconButton size='small' color="inherit" onClick={() => setOpen(true)}>
            <AddRounded />
        </IconButton>

        <Dialog
            open={open}
            onClose={() => {
                setOpen(false)
                resetForm()
            }}
        >
            <Box p={3} width={360}>
                <Typography variant='h5' align='center'>New Person</Typography>
                <form onSubmit={handleSubmit}>
                    <Box p={2}>
                        {(Object.keys(values) as (keyof typeof values)[]).map((name, i) =>
                            <Box key={i} mb={2}>
                                <TextField
                                    size='small'
                                    error={!!errors[name]}
                                    helperText={errors[name]}
                                    variant='outlined'
                                    autoComplete='off'
                                    label={name}
                                    onChange={handleChange}
                                    name={name}
                                    value={values[name]}
                                    fullWidth
                                />
                            </Box>
                        )}
                    </Box>
                    <Button type="submit" color='primary' variant='contained' size='large' fullWidth>
                        Submit
                    </Button>
                </form>
            </Box>
        </Dialog>
    </>
}

export default NewPerson
