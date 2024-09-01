import { Consumer, Kafka, logLevel, Partitioners, Producer } from "kafkajs";
import { MessageHandler, MessgaeBrokerType, PublishType } from "./broker.type";
import {
  MessgaeType,
  OrderEvent,
  TOPIC_TYPE
} from "../types/subscription.type";

//configuration properties

const CLIENT_ID = process.env.CLIENT_ID || "order-service";
const GROUP_ID = process.env.GROUP_ID || "order-service-group";
const BROKER = [process.env.BROKER_1 || "localhost:9092"];

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKER,
  logLevel: logLevel.INFO
});

let producer: Producer;
let consumer: Consumer;

const createTopic = async (topic: string[]) => {
  const topics = topic.map(t => ({
    topic: t,
    numPartitions: 2,
    replicationFactor: 1
  }));
  const admin = kafka.admin();
  await admin.connect();
  const topicExists = await admin.listTopics();
  for (const t of topics) {
    if (!topicExists.includes(t.topic)) {
      await admin.createTopics({
        topics: [t]
      });
    }
  }
  await admin.disconnect();
};

const connectProducer = async <T>(): Promise<T> => {
  await createTopic(["OrderEvents"]);
  if (producer) {
    return (producer as unknown) as T;
  }
  producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner
  });
  await producer.connect();
  return (producer as unknown) as T;
};

const disconnectProducer = async (): Promise<void> => {
  if (producer) {
    await producer.disconnect();
  }
};

export const publish = async (data: PublishType): Promise<boolean> => {
  const producer = await connectProducer<Producer>();
  const result = await producer.send({
    topic: data.topic,
    messages: [
      {
        headers: data.headers,
        key: data.event,
        value: JSON.stringify(data.message)
      }
    ]
  });
  return !result;
};

const connectConsumer = async <T>(): Promise<T> => {
  if (consumer) {
    return (consumer as unknown) as T;
  }
  consumer = kafka.consumer({
    groupId: GROUP_ID
  });
  await consumer.connect();
  return (consumer as unknown) as T;
};

const disconnectConsumer = async (): Promise<void> => {
  if (consumer) {
    await consumer.disconnect();
  }
};

const subscribe = async (
  messageHandler: MessageHandler,
  topic: TOPIC_TYPE
): Promise<void> => {
  const consumer = await connectConsumer<Consumer>();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (topic !== "OrderEvents") {
        return;
      }
      if (message.key && message.value) {
        const inputMessage: MessgaeType = {
          headers: message.headers,
          event: message.key.toString() as OrderEvent,
          data: message.value ? JSON.parse(message.value.toString()) : null
        };
        await messageHandler(inputMessage);
        await consumer.commitOffsets([
          { topic, partition, offset: (Number(message.offset) + 1).toString() }
        ]);
      }
    }
  });
};

export const MessageBroker: MessgaeBrokerType = {
  // connectProducer: function<T>(): Promise<T> {
  //     throw new Error("Function not implemented.");
  // },
  // disconnectProducer: function(): Promise<void> {
  //     throw new Error("Function not implemented.");
  // },
  // publish: function(data: PublishType): Promise<boolean> {
  //     throw new Error("Function not implemented.");
  // },
  // connectConsumer: function<T>(): Promise<T> {
  //     throw new Error("Function not implemented.");
  // },
  // disconnectConsumer: function(): Promise<void> {
  //     throw new Error("Function not implemented.");
  // },
  // subscribe: function(messageHandler: MessageHandler, topic: string): Promise<void> {
  //     throw new Error("Function not implemented.");
  // },
  connectProducer,
  disconnectProducer,
  publish,
  connectConsumer,
  disconnectConsumer,
  subscribe
};
