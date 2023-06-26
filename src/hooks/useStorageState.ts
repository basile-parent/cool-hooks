import {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react"

export type UseStorageStateOptions = {
    storageMethod?: StorageMethod
    synced?: boolean
}
type StorageMethod = "localStorage" | "sessionStorage"

function useStorageState<T>(key: string, initialState: T, options: UseStorageStateOptions): [ T, Dispatch<SetStateAction<T>> ]
function useStorageState<T>(key: string, initialState: T, options?: UseStorageStateOptions): [ T, Dispatch<SetStateAction<T>> ]

/**
 * This hook is a override of the `useState` hook which store the state value in the browser storage
 * @param key The key to use in storage
 * @param initialState (optional) The value of the initial state. Used ONLY if there is no value already stored
 * @param options (optional) Options
 */
function useStorageState<T = undefined>(key: string, initialState?: T, options?: UseStorageStateOptions): [ T | undefined, Dispatch<SetStateAction<T  | undefined>> ] {
    const appliedStorageMethod = options?.storageMethod || "localStorage"

    const initialStoredState = useMemo(() => getStoredItem(key, appliedStorageMethod) as T, [])
    const [state, setState] = useState<T | undefined>(initialStoredState || initialState)

    useEffect(() => {
        validateProps(options)
    }, [options])

    useEffect(() => {
        if (!options?.synced) {
            return
        }
        const onStorage = (e: StorageEvent): void => {
            if (e.storageArea === getStorage(appliedStorageMethod) && e.key === key) {
                setState(parseJSON(e.newValue))
            }
        }

        window.addEventListener("storage", onStorage)
        return (): void => window.removeEventListener("storage", onStorage)
    }, [key, options?.synced])

    const changeState = (newState: SetStateAction<T | undefined>) => {
        const newValue = newState instanceof Function ? newState(state) : newState

        setStoredItem(key, newValue, appliedStorageMethod)
        setState(newState)
    }

    return [state, changeState]
}

const getStorage = (storageMethod: StorageMethod): Storage =>
    storageMethod === "localStorage" ? window.localStorage : window.sessionStorage

const getStoredItem = <T>(key:string, storageMethod: StorageMethod): T | undefined => {
    return parseJSON(getStorage(storageMethod).getItem(key))
}

const setStoredItem = <T>(key: string, value: T | undefined, storageMethod: StorageMethod): void => {
    getStorage(storageMethod).setItem(key, JSON.stringify(value))
}

// A wrapper for "JSON.parse()"" to support "undefined" value
const parseJSON = <T>(value: string | null): T | undefined => {
    try {
        return !value || value === "undefined" ? undefined : JSON.parse(value)
    } catch {
        console.error("JSON parsing error on", value)
        return undefined
    }
}

const validateProps = (options?: UseStorageStateOptions): void => {
    if (options?.storageMethod === "sessionStorage" && options?.synced) {
        console.warn(`[useStorageState] sessionStorage cannot be synchronized between tabs. Either remove the "synced" option or switch to localStorage.`)
    }
}

export default useStorageState