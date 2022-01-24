import { getAnime } from "animedao";
import type { NextApiRequest as Request, NextApiResponse as Response } from "next";

import { handleError } from "@utils";

const get = async (req: Request, res: Response) => {
    const anime = await getAnime(String(req.query.slug));
    anime.episodes.reverse();

    res.status(200).json(anime);
};

export default async function handler(req: Request, res: Response) {
    const { method } = req;

    try {
        switch (method) {
            case "GET":
                await get(req, res);
                break;
            default:
                res.status(404).json("Not found");
        }
    } catch (error) {
        res.status(500).json(handleError(error));
    }
}
