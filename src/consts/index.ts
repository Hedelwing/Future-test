import { IDataset, IDirection, IPersonTableKeys } from '../types'

export const datasets: IDataset[] = [{
    name: "Small",
    url: `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
}, {
    name: "Large",
    url: `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
}]

export const tableColumns: IPersonTableKeys[] = ["id", "firstName", "lastName", "email", "phone"]

export const directions: IDirection[] = ['asc', 'desc', null]