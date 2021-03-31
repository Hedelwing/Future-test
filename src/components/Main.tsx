import React, { useState } from 'react'
import { Box, Button, Typography, Card, LinearProgress } from '@material-ui/core'
import { Context } from "../store/context"
import { SET_DATA, SET_DATASET } from '../store/actions'
import { datasets } from '../consts'
import UserCard from './UserCard/UserCard'
import { IPerson } from '../types'
import Search from './Search/Search'
import NewPerson from './NewPerson/NewPerson'
import DataTable from './Table/DataTable'


export default () => {
    const [{ data, dataset }, dispatch] = React.useContext(Context)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    React.useEffect(() => {
        async function getData(url: string) {
            setLoading(true)

            try {
                const response = await fetch(url)
                const data: IPerson[] = await response.json()

                dispatch({ type: SET_DATA, payload: data })
            }
            catch (e) {
                setError(e.message)
            }
            finally {
                setLoading(false)
            }
        }

        dataset ? getData(dataset.url)
            : dispatch({ type: SET_DATA, payload: [] })
    }, [dataset])

    const [person, setPerson] = useState(null as unknown as IPerson)

    return <>
        {data.length
            ? <>
                <Box display='flex' alignItems='center' justifyContent='flex-end' height={72}>
                    <Box mr={1}>
                        <Search />
                    </Box>

                    <Box mr='auto'>
                        <NewPerson />
                    </Box>

                    <Button color='primary' variant='contained' onClick={() => dispatch({ type: SET_DATASET, payload: null })}>
                        Exit
                    </Button>
                </Box>

                <Box mb={2}>
                    <DataTable handleClick={setPerson} />
                </Box>

                {person && <Box mb={2}>
                    <UserCard person={person} />
                </Box>}
            </>
            : <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
                <Card>
                    <Box py={3} px={4} width={480} position='relative'>
                        {loading && <LinearProgress style={{ top: 0, position: 'absolute', left: 0, right: 0 }} />}

                        <Box mb={3}>
                            <Typography variant="h5" component="h1" align='center' style={{ textTransform: 'uppercase' }}>Choose a dataset:</Typography>
                            {error && <Typography color='error'>{error}</Typography>}
                        </Box>

                        <Box display="flex" justifyContent="center" position='relative'>
                            {datasets.map((dataset, i) =>
                                <Box key={i} p={1} flex={1}>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        fullWidth
                                        disabled={loading}
                                        onClick={() => dispatch({ type: SET_DATASET, payload: dataset })}
                                    >
                                        {dataset.name}
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Card>
            </Box>
        }
    </>
}