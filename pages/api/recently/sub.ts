import type { NextApiRequest as Request, NextApiResponse as Response } from "next";
import axios from "redaxios";

import { AxiosRecentlySub } from "@types";

import { BASE_URL } from "@config";

import { handleError } from "@utils/index";

const get = async (req: Request, res: Response) => {
    try {
        const { data } = await axios.get<AxiosRecentlySub>(`${BASE_URL}/RecentlyUpdated/Sub`);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(handleError(error));
    }
};

export default function handler(req: Request, res: Response) {
    const { method } = req;

    switch (method) {
        case "GET":
            get(req, res);
    }
}
