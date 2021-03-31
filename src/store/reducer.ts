import { ADD_PERSON, SET_DATA, SET_DATASET, SET_PAGINATION, SET_SEARCH_PARAMS, SET_SORT_PARAMS } from './actions';
import { IAction, IState } from '../types';

export const defaultValue: IState = {
    dataset: null,
    data: [],
    page: 1,
    sort: {
        direction: "asc",
        field: null
    },
    search: ''
}

export const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case ADD_PERSON:
            return {
                ...state,
                page: 1,
                data: [action.payload, ...state.data],
            }

        case SET_SEARCH_PARAMS: {
            return { ...state, page: 1, search: action.payload }
        }

        case SET_DATASET:
            return { ...state, dataset: action.payload }

        case SET_DATA:
            return { ...state, data: action.payload }

        case SET_SORT_PARAMS:
            return {
                ...state,
                page: 1,
                sort: action.payload
            }

        case SET_PAGINATION:
            return { ...state, page: action.payload }

        default:
            return state
    }
}