import { DependencyList, EffectCallback, useEffect, useRef } from "react"

/**
 * This hook is basically a useEffect hook but executing only on component update (not on the first render)
 * @param callback The callback function to call
 * @param dependencies The dependencies list
 */
const useDidUpdateEffect = (callback: EffectCallback, dependencies?: DependencyList): void => {
    const didMountRef = useRef(false)

    useEffect(() => {
        if (didMountRef.current) {
            return callback()
        }
        didMountRef.current = true
    }, dependencies)
}

export default useDidUpdateEffect