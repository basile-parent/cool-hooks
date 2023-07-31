import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {EventBusProvider} from "./useEventBus";
import {useEventBus} from "../index";

const TestedComponent = ({callback}: { callback: (message: any) => void }) => {
    return (
        <EventBusProvider>
            <EmitterComponent/>
            <SubscriberComponent callback={callback}/>
        </EventBusProvider>
    )
}

const SubscriberComponent = ({callback}: { callback: (message: any) => void }) => {
    const {subscribe, unsubscribe} = useEventBus();

    return (
        <div>
            <button onClick={() => subscribe("CHANNEL-1", callback)}>Subscribe</button>
            <button onClick={() => unsubscribe("CHANNEL-1", callback)}>Unsubscribe</button>
        </div>
    )
}


const EmitterComponent = () => {
    const {emit} = useEventBus();

    return (
        <div>
            <button onClick={() => emit("CHANNEL-1", "Channel 1 message")}>Emit Channel 1</button>
            <button onClick={() => emit("CHANNEL-2", "Channel 2 message")}>Emit Channel 2</button>
        </div>
    )
}

describe("useEventBus tests", () => {

    it("should call the callback function when emitting a message on the right channel", async () => {
        // Given
        const callback = vi.fn()
        render(<TestedComponent callback={callback}/>)

        const subscribeButton = screen.getByText(/Subscribe/)
        const emitButton = screen.getByText(/Emit Channel 1/i)

        // When
        await userEvent.click(subscribeButton)
        await userEvent.click(emitButton)

        // Then
        expect(callback).toHaveBeenCalledWith("Channel 1 message")
    })

    it("should not call the callback function when emitting a message on the wrong channel", async () => {
        // Given
        const callback = vi.fn()
        render(<TestedComponent callback={callback}/>)

        const subscribeButton = screen.getByText(/Subscribe/)
        const emitButton = screen.getByText(/Emit Channel 2/i)

        // When
        await userEvent.click(subscribeButton)
        await userEvent.click(emitButton)

        // Then
        expect(callback).not.toHaveBeenCalled()
    })

    it("should not call the callback function when emitting a message on the right channel but component have unsubscribe channel", async () => {
        // Given
        const callback = vi.fn()
        const {getByText} = render(<TestedComponent callback={callback}/>)

        const subscribeButton = getByText(/Subscribe/)
        const unsubscribeButton = getByText(/Unsubscribe/)
        const emitButton = getByText(/Emit Channel 1/i)

        // When
        await userEvent.click(subscribeButton)
        await userEvent.click(unsubscribeButton)
        await userEvent.click(emitButton)

        // Then
        expect(callback).not.toHaveBeenCalled()
    })

})
