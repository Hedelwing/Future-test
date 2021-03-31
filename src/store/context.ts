import React from 'react'
import { IAction, IState } from '../types'

export const Context = React.createContext([{}, (value) => console.log(value)] as [IState, React.Dispatch<IAction>])

export default Context