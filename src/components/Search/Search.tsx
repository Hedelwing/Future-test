import { InputBase, makeStyles } from '@material-ui/core'
import { SearchRounded } from '@material-ui/icons'
import React, { memo } from 'react'
import { Context } from "../../store/context"
import { SET_SEARCH_PARAMS } from '../../store/actions'
import useForm from '../Hooks/useForm'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        transition: '.2s ease',
        width: 160,
        borderRadius: 4,
        position: 'relative',
        border: `1px solid ${theme.palette.grey[400]}`,
        boxSizing: 'border-box',
        color: theme.palette.text.primary,
        '&:focus-within': {
            width: 320,
            color: theme.palette.primary.main,
        },
        '&:focus-within::before': {
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            borderTop: `2px solid ${theme.palette.primary.main}`,
            transform: 'scale(1)',
        },
        '&:focus-within::after': {
            borderLeft: `2px solid ${theme.palette.primary.main}`,
            borderRight: `2px solid ${theme.palette.primary.main}`,
            transform: 'scale(1)',
        },
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            borderRadius: 4,
            top: -1,
            bottom: -1,
            left: -1,
            right: -1,
            transition: '.2s ease-in',
            pointerEvents: 'none',
        },
        '&:before': {
            transform: 'scale(0,1)'
        },
        '&:after': {
            transform: 'scale(1,0)'
        },
    },
    ico: {
        position: 'absolute',
        right: 8,
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none'
    },
    input: {
        paddingRight: 40,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
    }
}))

const Search = memo(() => {
    const [, dispatch] = React.useContext(Context)

    const { values, handleSubmit, handleChange } = useForm({
        initialValues: {
            search: ''
        },
        onSubmit: ({ search }) => { dispatch({ type: SET_SEARCH_PARAMS, payload: search }) }
    })

    const { root, ico, input } = useStyles()


    return <form data-testid='search' className={root} onSubmit={handleSubmit}>
        <InputBase
            inputProps={{ className: input }}
            autoComplete='off'
            onChange={handleChange}
            name='search'
            value={values.search}
            fullWidth
            placeholder="Search"
        />
        <SearchRounded className={ico} />
    </form>
})

export default Search