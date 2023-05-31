import { useEffect, useMemo, useRef } from "react"

export type UseWhyDidYouUpdateOptions = {
    exclude?: string[]
}

type AnyObject = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

// This hook is used for debugging reasons.
// CAUTION: This hook does a SHALLOW comparison (behaviour different from createBasicMemoComparator)

// IT SHOULD NOT BE USED IN PRODUCTION (so clean your code before building the app)
const useWhyDidYouUpdate = <P extends AnyObject>(name: string, props: P, options?: UseWhyDidYouUpdateOptions): void => {
    const previousProps = useRef<P>()
    const excludeProps = useMemo(() => options?.exclude || [], [])

    useEffect(() => {
        if (previousProps.current) {
            const allKeys = Object.keys({ ...(previousProps.current as any), ...props }).filter((key) => !excludeProps.includes(key))
            const changesObj: ChangedPropsAggregation = {}
            allKeys.forEach((key) => {
                const previousValue = previousProps.current?.[key];
                const currentValue = props[key];

                if (previousValue !== currentValue) {
                    changesObj[key as keyof typeof changesObj] = {
                        from: previousValue || "",
                        to: currentValue,
                    }
                }
            })

            if (Object.keys(changesObj).length) {
                logChanges("why-did-you-update", name, changesObj)
            }
        }

        previousProps.current = props
    })
}

export type ChangedPropsAggregation = {
    [key: string]: { from: string; to: string }
}

export const logChanges = (groupName: string, componentName: string, changesObj: ChangedPropsAggregation): void => {
    console.groupCollapsed(`%c[${groupName}]%c ${componentName}:%c ${Object.keys(changesObj).join(", ")}`, "color: red; font-weight: 700;", "color: black", "font-weight: normal;")
    Object.entries(changesObj).forEach(([key, value]) => {
        console.log(key, value)
    })
    console.groupEnd()
}

export default useWhyDidYouUpdate