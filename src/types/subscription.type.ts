export enum OrderEvent {
    CREATE_ORDER = "create_order",
    CANCEL_ORDER = "cancel_order",
}

export type TOPIC_TYPE = "OrderEvents" | "CatalogEvents";

export interface MessgaeType{
    headers?: Record<string, any>;
    event: OrderEvent;
    data: Record<string, any>;};
