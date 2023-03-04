import crypto from "crypto";
import type { Request, Response } from "express";

import { prisma } from "./prisma";

export interface RecallDatum {
  name: string;
  publish_date: string;
  product_info: string;
  date_markings: string;
  problem: string;
  food_safety_hazard: string;
  country_of_origin: string;
  what_to_do: string;
  image_url: string;
}

export const recallFeedHandler = async (req: Request, res: Response) => {
  const body = req.body as RecallDatum[];

  // Insert each record into the database
  for (const {
    country_of_origin,
    date_markings,
    food_safety_hazard,
    image_url,
    name,
    problem,
    product_info,
    publish_date,
    what_to_do,
  } of body) {
    try {
      const p = await prisma.recallableProduct.create({
        data: {
          id: crypto
            .createHash("sha256")
            .update(`${name}:${publish_date}`)
            .digest("hex"),
          date_markings,
          food_safety_hazard,
          image_url,
          name,
          problem,
          product_info,
          recall_date: publish_date,
          what_to_do,
          origin: country_of_origin,
        },
      });

      console.log("Injected: ", p);
      // TODO: Handle new product notify
    } catch (error) {
      // Product already exists, probably
      console.error(error);
    }
  }
  return res.sendStatus(200);
};
