import {createContext, PropsWithChildren, useContext, useState} from "react";

type EventBusContextType = {
    emit: (channel: string, message: any) => void
    subscribe: (channel: string, callback: SubscriberCallback) => void
    unsubscribe: (channel: string, callback: SubscriberCallback) => void
}

type SubscriberCallback = (message: any) => void

type Subscribers = {
    [channel: string]: SubscriberCallback[]
}

const EventBusContext = createContext<EventBusContextType | null>(null);

export function EventBusProvider({ children }: PropsWithChildren<any>) {
    const [subscribers, setSubscribers] = useState<Subscribers>({})

    const emit = (channel: string, message: any): void => {
        const channelSubscribers = subscribers[channel] || []
        channelSubscribers.forEach(callback => callback(message))
    }
    const subscribe = (channel: string, callback: SubscriberCallback): void => {
        setSubscribers(subscribers => ({
            ...subscribers,
            [ channel ]: [ ...(subscribers[channel] || []), callback ]
        }))
    }

    const unsubscribe = (channel: string, callback: SubscriberCallback): void => {
        setSubscribers(subscribers => ({
            ...subscribers,
            [ channel ]: (subscribers[channel] || []).filter(subscriberCallback => subscriberCallback !== callback)
        }))
    }

    return <EventBusContext.Provider value={{ subscribe, unsubscribe, emit }}>{children}</EventBusContext.Provider>;
}

const useEventBus = () => useContext(EventBusContext) as EventBusContextType;

export default useEventBus