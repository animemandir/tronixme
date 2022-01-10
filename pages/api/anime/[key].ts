import type { NextApiRequest as Request, NextApiResponse as Response } from "next";
import axios from "redaxios";

import { BASE_URL } from "@config";

import { handleError } from "@utils";

const get = async (req: Request, res: Response) => {
    const { key } = req.query;
    try {
        const { data } = await axios.get(`${BASE_URL}/anime/${key}`);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(handleError(error));
    }
};

export default async function handler(req: Request, res: Response) {
    const { method } = req;

    switch (method) {
        case "GET":
            await get(req, res);
            break;
        default:
            res.status(404).json("Not found");
    }
}
