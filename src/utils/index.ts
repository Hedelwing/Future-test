import { IDirection, IFormValues, IValidationSchema, IFormErrors } from "../types"
import { directions } from '../consts'

export const getTotalPages = (total: number, perPage: number = 24): number =>
    Math.ceil(total / perPage)

export const getDataPerPage = (data: Array<any>, page: number = 1, perPage: number = 15): Array<any> =>
    data.slice((page - 1) * perPage, page * perPage)

export const isObject = (item: any): boolean =>
    Object.prototype.toString.call(item) === '[object Object]'

export const hasOverlap = (value: any, search: string): boolean =>
    typeof value === 'string' || typeof value === 'number'
        ? value
            .toString()
            .toLowerCase()
            .includes(search)
        : false

export function ascSorting<T>(field: keyof T) {
    return function (a: T, b: T) {
        if (a[field] < b[field])
            return -1
        if (a[field] > b[field])
            return 1
        return 0
    }
}

export function descSorting<T>(field: keyof T) {
    return function (a: T, b: T) {
        if (a[field] > b[field])
            return -1
        if (a[field] < b[field])
            return 1
        return 0
    }
}

export const nextSortDirection = (cur: IDirection) => {
    const curIdx = directions.indexOf(cur);
    if (!cur || curIdx === -1 || curIdx + 1 === directions.length) {
        return directions[0];
    }

    return directions[curIdx + 1];
}

export const checkErrors = (errors: Object) => Object.values(errors).every(error => !error)

export const getValidationErrors = <IValues extends IFormValues>(
    values: IValues,
    validationSchema?: IValidationSchema<IValues>
): IFormErrors<IValues> => validationSchema
        ? (Object.keys(validationSchema) as (keyof IValidationSchema<IFormValues>)[])
            .reduce((prev, cur) => {
                const [regexp, errMessage] = validationSchema[cur]

                return {
                    ...prev,
                    [cur]: regexp.test(values[cur]) ? undefined : errMessage
                }
            }, {})
        : {}