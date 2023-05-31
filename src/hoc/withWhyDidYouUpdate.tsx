import {ComponentType, ReactElement} from "react"
import {useWhyDidYouUpdate, UseWhyDidYouUpdateOptions} from "../index"

// This HOC is used for debugging reasons.
// IT SHOULD NOT BE USED IN PRODUCTION (so clean your code before building the app)
const withWhyDidYouUpdate = <P extends object>(WrappedComponent: ComponentType<P>, options?: UseWhyDidYouUpdateOptions): ((props: P) => ReactElement) => {
    return (props: P): ReactElement => {
        useWhyDidYouUpdate(WrappedComponent.displayName || WrappedComponent.name || "Unnamed component", props, options)
        return <WrappedComponent {...props} />
    }
}

export default withWhyDidYouUpdate