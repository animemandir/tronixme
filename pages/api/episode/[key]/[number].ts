import cheerio from "cheerio";
import type { NextApiRequest as Request, NextApiResponse as Response } from "next";
import axios from "redaxios";

import { AxiosEpisodeAnime } from "@types";

import { BASE_URL, USER_AGENT } from "@config";

import { generateEncryptAjaxParameters, handleError } from "@utils";

export const scrapeUrl = async (anime: string, number: string) => {
    const { data: links } = await axios.get<AxiosEpisodeAnime[]>(
        `${BASE_URL}/episode/${anime}/${number}`
    );

    const url = new URL(links[0].vidcdn);

    const { data: html } = await axios.get(url.href, {
        headers: {
            "User-Agent": USER_AGENT,
        },
    });

    const $ = cheerio.load(html);
    const params = generateEncryptAjaxParameters($, url.searchParams.get("id") || "");

    const { data: videos } = await axios.get(
        `${url.protocol}//${url.hostname}/encrypt-ajax.php?${params}`,
        {
            headers: {
                "User-Agent": USER_AGENT,
                Referrer: url.href,
                "X-Requested-With": "XMLHttpRequest",
            },
        }
    );

    return videos;
};

const get = async (req: Request, res: Response) => {
    const { key, number } = req.query;
    try {
        res.status(200).json(await scrapeUrl(String(key), String(number)));
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
