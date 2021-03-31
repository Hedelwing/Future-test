import { SET_DATASET, SET_DATA, ADD_PERSON, SET_SORT_PARAMS, SET_SEARCH_PARAMS, SET_PAGINATION } from "../store/actions"

export type IAdress = {
    streetAddress: string
    city: string
    state: string
    zip: string
}

export type IPerson = {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    description?: string
    address?: IAdress
}

export type IPersonTableKeys = keyof Omit<IPerson, 'description' | 'address'>

export type IPagination = {
    current: number,
    perPage: number,
    total: number
}

export type IDirection = "asc" | "desc" | null

export type IDataset = {
    name: string
    url: string
}

export type IState = {
    dataset: IDataset | null,
    data: IPerson[],
    page: number,
    search: string,
    sort: {
        direction: IDirection,
        field: keyof Omit<IPerson, 'address' | 'description'> | null
    }
}

type SetDataAction = {
    type: typeof SET_DATA,
    payload: IPerson[]
}


type SetDataSetAction = {
    type: typeof SET_DATASET,
    payload: IDataset | null
}

type SortAction = {
    type: typeof SET_SORT_PARAMS,
    payload: {
        direction: IDirection
        field: keyof Omit<IPerson, 'address' | 'description'> | null
    }
}

type AddPersonAction = {
    type: typeof ADD_PERSON,
    payload: Omit<IPerson, 'address' | 'description'>
}

type SearchAction = {
    type: typeof SET_SEARCH_PARAMS,
    payload: string
}

type PaginationAction = {
    type: typeof SET_PAGINATION,
    payload: number
}

export type IAction = SetDataAction | SetDataSetAction | SortAction | AddPersonAction | SearchAction | PaginationAction


export type IFormValues = {
    [field: string]: string
}

export type IFormErrors<T> = {
    [key in keyof T]?: string
}

export type IValidationSchema<T> = {
    [key in keyof T]: [RegExp, string]
}