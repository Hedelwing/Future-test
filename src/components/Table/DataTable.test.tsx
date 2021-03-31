import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DataTable from './DataTable'
import Context from '../../store/context'
import { defaultValue } from '../../store/reducer'
import { tableColumns } from '../../consts'

const fakeData = [{
    "id": 386,
    "firstName": "Khosrow",
    "lastName": "Kluger",
    "email": "SKirchner@turpis.org",
    "phone": "(561)747-6637",
    "address": {
        "streetAddress": "4515 Lacus Ct",
        "city": "Rochester",
        "state": "RI",
        "zip": "70009"
    },
    "description": "eget velit malesuada fringilla consequat mattis elit sed sit sed lorem amet augue orci magna ante amet ac placerat vel tincidunt nec neque ipsum pretium magna mi dolor nullam vestibulum magna mattis"
},
{
    "id": 334,
    "firstName": "Jane",
    "lastName": "Love",
    "email": "JMick@vestibulum.ly",
    "phone": "(167)007-7074",
    "address": {
        "streetAddress": "6442 Sed Dr",
        "city": "Bellevue",
        "state": "MD",
        "zip": "84004"
    },
    "description": "augue tincidunt aenean nunc tempor porta massa at sagittis magna elementum neque lectus in tellus tincidunt adipiscing convallis orci lacus sed malesuada elementum malesuada sed adipiscing ante scelerisque rutrum sit in ipsum"
},
{
    "id": 603,
    "firstName": "Teresa",
    "lastName": "Kirkley",
    "email": "SAtkins@quis.org",
    "phone": "(407)635-1707",
    "address": {
        "streetAddress": "1616 Nullam Rd",
        "city": "Cumberland",
        "state": "LA",
        "zip": "98989"
    },
    "description": "odio lectus donec consequat odio vestibulum orci aliquam consequat nec porta velit molestie orci magna porttitor hendrerit nec suspendisse magna rutrum vel ac risus dolor elit tortor amet rutrum facilisis massa tincidunt"
}]

it('Test table', () => {
    const dispatch = jest.fn()
    const handleClick = jest.fn()

    const { getAllByTestId, getByTestId } = render(<Context.Provider value={[{ ...defaultValue, data: fakeData }, dispatch]}>
        <DataTable handleClick={handleClick} />
    </Context.Provider>
    )

    expect(getByTestId('pagination')).toBeInTheDocument()
    expect(getAllByTestId('table-row')).toHaveLength(fakeData.length)

    expect(handleClick).toBeCalledTimes(0)

    const rows = getAllByTestId('table-row')

    rows.forEach(row =>
        fireEvent.click(row)
    )

    expect(handleClick).toBeCalledTimes(rows.length)

    expect(dispatch).toBeCalledTimes(0)

    const headcell = getAllByTestId('table-head')

    headcell.forEach(cell =>
        fireEvent.click(cell)
    )

    expect(dispatch).toBeCalledTimes(tableColumns.length)
})