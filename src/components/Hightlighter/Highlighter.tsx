import React, { ComponentClass, FC } from "react"
import { makeStyles } from '@material-ui/core'

type Props = {
    text: string
    highlight?: string
    component?: ComponentClass<any, any> | string | FC<any>
    [key: string]: any
}

const useStyle = makeStyles({
    hlt: {
        background: "#ffffa3",
        fontWeight: 700
    }
})

/** Wraps each overlap in the passed component (b tag by default) */
const Highlighter: FC<Props> = ({ component = "b", text, highlight, ...props }) => {
    const { hlt } = useStyle()

    return <>
        {highlight
            ? text
                .toString()
                .split(new RegExp(`(${highlight})`, "gi"))
                .map((piece, i) =>
                    piece.toLowerCase() === highlight.toLowerCase()
                        ? React.createElement(component, { className: hlt, key: i, 'data-testid': 'highlight', ...props }, piece)
                        : piece
                )
            : text
        }
    </>
}

export default Highlighter