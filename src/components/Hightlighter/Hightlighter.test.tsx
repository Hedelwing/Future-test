import React, { FC } from 'react';
import { render } from '@testing-library/react'
import Highlight from './Highlighter';

const CustomComponent: FC = ({ children, ...props }) =>
    <div {...props} data-testid="custom">{children}</div>

describe('renders correctly', () => {
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    const highlight = "dolor"

    test('by default highligher component', () => {
        const { container, getAllByTestId } = render(<Highlight text={text} highlight={highlight} />)

        expect(getAllByTestId('highlight')).toHaveLength(4)
        expect(getAllByTestId('highlight')[3]).toHaveTextContent(new RegExp(highlight, `i`))
        expect(container).toHaveTextContent(text)
    })


    test('by custom highligher component', () => {

        const { container, getAllByTestId } = render(
            <Highlight
                className="customClx"
                text={text}
                highlight={highlight}
                component={CustomComponent}
            />
        )

        const highlighted = getAllByTestId('custom')

        expect(highlighted).toHaveLength(4)
        expect(highlighted[3]).toHaveTextContent(new RegExp(highlight, `i`))
        expect(highlighted[3]).toHaveClass("customClx")
        expect(container).toHaveTextContent(text)
    })

    test('without hightlighed text', () => {

        const { container, queryAllByTestId } = render(
            <Highlight
                text={text}
                component={CustomComponent}
            />
        )

        expect(queryAllByTestId('custom')).toHaveLength(0)
        expect(container).toHaveTextContent(text)
    })
}); 