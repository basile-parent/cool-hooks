import {useState} from "react";
import {useWhyDidYouUpdate} from "./index";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";


const TestedComponent = () => {
    const [count, setCount] = useState(0)

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <ChildComponent count={count} fixed="A"/>
        </div>
    )
}

const ChildComponent = (props: { count: number, fixed: string }) => {
    const {count, fixed} = props

    useWhyDidYouUpdate("ChildComponent", props)

    return (
        <div>
            <p>Count = {count}</p>
            <p>Fixed = {fixed}</p>
        </div>
    )
}

describe("useWhyDidYouUpdate tests", () => {
    it("should log changed props when the component is rerendered", async () => {
        global.console = {log: jest.fn()} as any

        render(<TestedComponent/>)
        const button = screen.getByText(/Increment/i)
        const count = screen.getByText(/Count/i)
        const fixed = screen.getByText(/Fixed/i)

        expect(console.log).not.toBeCalled()

        await userEvent.click(button)

        expect(count).toHaveTextContent(/^Count = 1$/)
        expect(fixed).toHaveTextContent(/^Fixed = A$/)

        expect(console.log).toBeCalledWith("[why-did-you-update]", "ChildComponent", {"count": {"from": 0, "to": 1}})
    })
});