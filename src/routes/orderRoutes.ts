import express, { NextFunction, Request, Response } from "express";
import { MessageBroker } from "../broker/message-broker";
import { OrderEvent } from "../types/subscription.type";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  await MessageBroker.publish({
    topic: "OrderEvents",
    headers: { token: req.headers.authorization },
    event: OrderEvent.CREATE_ORDER,
    message: {
      orderId: 1,
      items: [
        {
          productId: 1,
          quantity: 1
        },
        {
          productId: 2,
          quantity: 2
        }
      ]
    }
  });
  return res.status(200).json({ message: "create order" });
});

export default router;
