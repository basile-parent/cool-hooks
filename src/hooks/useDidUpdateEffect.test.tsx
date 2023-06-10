import {useState} from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useDidUpdateEffect from "./useDidUpdateEffect";

const TestedComponent = ({ callback }: { callback: () => void}) => {
    const [count, setCount] = useState(1)

    useDidUpdateEffect(callback, [ count ])

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}

describe("useDidUpdateEffect tests", () => {
    it("should execute callback only on update (not on mount)", async () => {
        const callback = jest.fn()

        render(<TestedComponent callback={callback} />)
        const button = screen.getByText(/Increment/i)

        expect(callback).not.toBeCalled()

        await userEvent.click(button)

        expect(callback).toBeCalled()
    })
});