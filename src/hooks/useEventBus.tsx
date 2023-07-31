import {createContext, PropsWithChildren, useContext, useState} from "react";

type EventBusContextType<T> = {
    emit: (channel: string, message: T) => void
    subscribe: (channel: string, callback: SubscriberCallback<T>) => void
    unsubscribe: (channel: string, callback: SubscriberCallback<T>) => void
}

type SubscriberCallback<T> = (message: T) => void

type Subscribers<T> = {
    [channel: string]: SubscriberCallback<T>[]
}

const EventBusContext = createContext<EventBusContextType<any> | null>(null);

export function EventBusProvider({ children }: PropsWithChildren<any>) {
    const [subscribers, setSubscribers] = useState<Subscribers<any>>({})

    const emit = (channel: string, message: any): void => {
        const channelSubscribers = subscribers[channel] || []
        channelSubscribers.forEach(callback => callback(message))
    }
    const subscribe = (channel: string, callback: SubscriberCallback<any>): void => {
        setSubscribers(subscribers => ({
            ...subscribers,
            [ channel ]: [ ...(subscribers[channel] || []), callback ]
        }))
    }

    const unsubscribe = (channel: string, callback: SubscriberCallback<any>): void => {
        setSubscribers(subscribers => ({
            ...subscribers,
            [ channel ]: (subscribers[channel] || []).filter(subscriberCallback => subscriberCallback !== callback)
        }))
    }

    return <EventBusContext.Provider value={{ subscribe, unsubscribe, emit }}>{children}</EventBusContext.Provider>;
}

const useEventBus = <T = void>() => useContext(EventBusContext) as EventBusContextType<T>;

export default useEventBus