import React, { memo } from 'react'
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Theme } from '@material-ui/core'
import { Context } from "../../store/context"
import { SET_PAGINATION, SET_SORT_PARAMS } from '../../store/actions'
import { ArrowDownward } from '@material-ui/icons'
import { IDirection, IPersonTableKeys } from '../../types'
import Highlighter from '../Hightlighter/Highlighter'
import { getDataPerPage, getTotalPages, descSorting, ascSorting, nextSortDirection, hasOverlap } from '../../utils'
import { Pagination } from '@material-ui/lab'
import { tableColumns } from '../../consts'

const useStyles = makeStyles<Theme, { direction: IDirection }>({
    arrow: {
        opacity: 0,
        transition: '.3s ease',
        transform: 'rotate(-180deg)'
    },
    arrowActive: {
        opacity: '1 !important',
        transform: ({ direction }) => direction === 'asc' ? 'rotate(-180deg)' : 'rotate(0deg)'
    },
    headCell: {
        textTransform: 'uppercase', 
        fontWeight: 'bold',
        '&:hover $arrow': {
            opacity: .3
        }
    }
})

const DataTable = memo(({ handleClick }: { handleClick: (person: any) => void }) => {
                const [{ data, page, search, sort: { direction, field } }, dispatch] = React.useContext(Context)

                const classes = useStyles({ direction })

                const filteredData = data
                    .filter(item =>
                        Object.keys(item)
                            .filter(key => tableColumns.includes(key as IPersonTableKeys))
                            .some(key => hasOverlap(item[key as IPersonTableKeys], search))
                    )

                const sortedData = direction && field
                    ? filteredData.sort(
                        direction === "desc"
                            ? descSorting(field)
                            : ascSorting(field)
                    )
                    : filteredData

                const pages = getTotalPages(sortedData.length)

                const currentPageData = getDataPerPage(sortedData, page)

                return <Box display='flex' flexDirection='column'>
                    <Box mb={2}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {tableColumns.map((column, i) =>
                                            <TableCell
                                                className={classes.headCell}
                                                onClick={() => {
                                                    dispatch({
                                                        type: SET_SORT_PARAMS,
                                                        payload: {
                                                            field: column,
                                                            direction: column === field ? nextSortDirection(direction) : 'asc'
                                                        }
                                                    })
                                                }}
                                                data-testid='table-head'
                                                key={i}
                                                valign='middle'
                                            >
                                                <Box display='inline-flex'>
                                                    <Box mr={1}>{column}</Box>
                                                    <ArrowDownward className={`${classes.arrow} ${column === field && direction ? classes.arrowActive : ''}`} />
                                                </Box>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentPageData.map((person, i) =>
                                        <TableRow onClick={() => handleClick(person)} key={i} data-testid='table-row'>
                                            {tableColumns.map((column, i) =>
                                                <TableCell key={i} align="left" data-testid='table-cell'>
                                                    <Highlighter text={person[column]} highlight={search} />
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    {!!pages && <Box mx='auto' data-testid='pagination'>
                        <Pagination
                            count={pages}
                            page={page}
                            onChange={(e, page) => {
                                dispatch({
                                    type: SET_PAGINATION,
                                    payload: page
                                })
                            }}
                        />
                    </Box>}

                </Box>
            })

export default DataTable