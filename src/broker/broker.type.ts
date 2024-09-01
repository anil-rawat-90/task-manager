import { MessgaeType, OrderEvent, TOPIC_TYPE } from "../types/subscription.type";

export interface PublishType {
    headers: Record<string, any>;
    topic: TOPIC_TYPE;
    event: OrderEvent;
    message: Record<string, any>;
}

export type MessageHandler = (input: MessgaeType) => void;

export type MessgaeBrokerType = {
    //producer
    connectProducer: <T>() => Promise<T>;
    disconnectProducer: () => Promise<void>;
    publish: (data: PublishType) => Promise<boolean>;
    //consumer
    connectConsumer: <T>() => Promise<T>;
    disconnectConsumer: () => Promise<void>;
    subscribe: (messageHandler: MessageHandler, topic: TOPIC_TYPE) => Promise<void>;
};
