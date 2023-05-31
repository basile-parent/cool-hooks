import {useState} from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useWhyDidYouUpdate from "./useWhyDidYouUpdate";

const TestedComponent = () => {
    const [count, setCount] = useState(1)

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <ChildComponent count={count} countSquared={count*count} fixed="A"/>
        </div>
    )
}

const ChildComponent = (props: { count: number, countSquared: number, fixed: string }) => {
    const {count, fixed, countSquared} = props

    useWhyDidYouUpdate("ChildComponent", props)

    return (
        <div>
            <p>Initial count = {count}</p>
            <p>Count squared = {countSquared}</p>
            <p>Fixed = {fixed}</p>
        </div>
    )
}

describe("useWhyDidYouUpdate tests", () => {
    it("should log a formatted message for changed props when the component is rerendered", async () => {
        global.console = {
            log: jest.fn(),
            groupCollapsed: jest.fn(),
            groupEnd: jest.fn(),
        } as any

        render(<TestedComponent/>)
        const button = screen.getByText(/Increment/i)
        const count = screen.getByText(/Initial count/i)
        const countSquared = screen.getByText(/Count squared/i)
        const fixed = screen.getByText(/Fixed/i)

        expect(console.log).not.toBeCalled()

        await userEvent.click(button)

        expect(count).toHaveTextContent(/^Initial count = 2$/)
        expect(countSquared).toHaveTextContent(/^Count squared = 4$/)
        expect(fixed).toHaveTextContent(/^Fixed = A$/)

        expect(console.groupCollapsed).toHaveBeenCalledWith(`%c[why-did-you-update]%c ChildComponent:%c count, countSquared`, expect.any(String), expect.any(String), expect.any(String))
        expect(console.log).toHaveBeenNthCalledWith(1, "count", expect.objectContaining({ from : 1, to: 2 }))
        expect(console.log).toHaveBeenNthCalledWith(2, "countSquared", expect.objectContaining({ from : 1, to: 4 }))
        expect(console.groupEnd).toHaveBeenCalled()
    })
});