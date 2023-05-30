import { useRef, useEffect } from "react"

type ChangesObject = {
    [key: string]: unknown
}
const useWhyDidYouUpdate = <TProps extends object>(name: string, props: TProps) => {
    // Get a mutable ref object where we can store props ...
    // ... for comparison next time this hook runs.
    const previousProps = useRef<TProps>();

    useEffect(() => {
        if (previousProps.current) {
            // Get all keys from previous and current props
            const allKeys = Object.keys({ ...previousProps.current as TProps, ...props });

            // Use this object to keep track of changed props
            const changesObj: ChangesObject = {};

            // Iterate through keys
            allKeys.forEach((key) => {
                const typedKey = key as keyof typeof props
                // If previous is different from current
                if (previousProps.current?.[typedKey] !== props[typedKey]) {
                    // Add to changesObj
                    changesObj[key] = {
                        from: previousProps.current?.[typedKey],
                        to: props[key as keyof typeof props],
                    };
                }
            });
            // If changesObj not empty then output to console
            if (Object.keys(changesObj).length) {
                console.log("[why-did-you-update]", name, changesObj);
            }
        }
        // Finally update previousProps with current props for next hook call
        previousProps.current = props;
    });
};

export default useWhyDidYouUpdate