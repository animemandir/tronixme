import cheerio from "cheerio";
import axios from "redaxios";
import { URL } from "url";

import { USER_AGENT } from "../constants";
import { AxiosVideos } from "../types";
import { bypassGogo } from "../utils";

export async function gogoParser(html: string, url: URL) {
    const params = bypassGogo(cheerio.load(html), url.searchParams.get("id") || "");

    const { data: videos } = await axios.get<AxiosVideos>(
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
}
