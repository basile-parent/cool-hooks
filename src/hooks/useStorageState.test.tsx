import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import useStorageState, {UseStorageStateOptions} from "./useStorageState"

const TestedComponent = ({ storageKey, initialCount, options }: { storageKey: string, initialCount: number, options?: UseStorageStateOptions }) => {
    const [count, setCount] = useStorageState(storageKey, initialCount, options)

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}

describe("useStorageState tests", () => {
    
    const STORAGE_KEY = "useStorageStateTests"

    afterEach(() => {
        window.localStorage.removeItem(STORAGE_KEY)
        window.sessionStorage.removeItem(STORAGE_KEY)
    })
    
    it("should store in localStorage (default value) when using the setState method", async () => {
        // Given
        render(<TestedComponent storageKey={STORAGE_KEY} initialCount={0} />)
        const button = screen.getByText(/Increment/i)

        // When
        await userEvent.click(button)

        // Then
        expect(window.localStorage.getItem(STORAGE_KEY)).toEqual("1")
    })

    it("should take the localStorage value as state initial value (override the default state passed in props)", async () => {
        // Given
        window.localStorage.setItem(STORAGE_KEY, "5")

        render(<TestedComponent storageKey={STORAGE_KEY} initialCount={0} />)
        const button = screen.getByText(/Increment/i)

        // When
        await userEvent.click(button)

        // Then
        expect(window.localStorage.getItem(STORAGE_KEY)).toEqual("6")
    })

    it("should store in sessionStorage (defined in props) when using the setState method", async () => {
        // Given
        render(<TestedComponent storageKey={STORAGE_KEY} initialCount={10} options={{ storageMethod: "sessionStorage" }} />)
        const button = screen.getByText(/Increment/i)

        // When
        await userEvent.click(button)

        // Then
        expect(window.sessionStorage.getItem(STORAGE_KEY)).toEqual("11")
    })

    it("should log a message in console when trying to synchronize sessionStorage state", async () => {
        // Given
        const consoleSpy = vi.spyOn(console, "warn")

        // When
        render(<TestedComponent storageKey={STORAGE_KEY} initialCount={10} options={{ storageMethod: "sessionStorage", synced: true }} />)

        // Then
        expect(consoleSpy).toBeCalled()
    })

})
