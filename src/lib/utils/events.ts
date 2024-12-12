import "client-only";

export type EventTarget = Element | Document | Window;
export type EventListener = EventListenerOrEventListenerObject;
export type EventOptions = boolean | AddEventListenerOptions;

const targetMap = new Map();

const eventListener = {
    add: (
        target: EventTarget,
        event: string,
        listener: EventListener,
        options?: EventOptions
    ) => {
        const listenerMap = targetMap.get(target) ?? {};

        if (listenerMap[event] !== undefined) {
            eventListener.remove(target, event);
        }

        listenerMap[event] = listener;

        targetMap.set(target, listenerMap);

        target.addEventListener(event.split(".")[0], listener, options);
    },

    remove: (target: EventTarget, event: string) => {
        const listenerMap = targetMap.get(target);

        if (listenerMap !== undefined && listenerMap[event] !== undefined) {
            target.removeEventListener(event.split(".")[0], listenerMap[event]);

            delete listenerMap[event];

            targetMap.set(target, listenerMap);
        }
    },
};

export default eventListener;
