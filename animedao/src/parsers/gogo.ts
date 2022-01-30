import cheerio from "cheerio";
import type { CheerioAPI } from "cheerio";
import CryptoJS from "crypto-js";
import axios from "redaxios";
import { URL } from "url";

import { USER_AGENT } from "../constants";
import { AxiosVideos } from "../types";

// credits to: https://github.com/MeemeeLab/node-anime-viewer
const bypassGogo = ($: CheerioAPI, id: string) => {
    const getRandomInt = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const f_random = (length: number) => {
        let i = length,
            str = "";
        while (i > 0x0) {
            i--, (str += getRandomInt(0, 9));
        }
        return str;
    };

    const value6 = $("script[data-name=\x27ts\x27]").data("value") as string;
    const value5 = $("[name='crypto']").attr("content") as string;
    const value1 = CryptoJS.enc.Utf8.stringify(
        CryptoJS.AES.decrypt(
            $("script[data-name=\x27crypto\x27]").data("value") as string,
            CryptoJS.enc.Utf8.parse(value6.toString() + value6.toString()),
            {
                iv: CryptoJS.enc.Utf8.parse(value6),
            }
        )
    );
    const value4 = CryptoJS.AES.decrypt(value5, CryptoJS.enc.Utf8.parse(value1), {
        iv: CryptoJS.enc.Utf8.parse(value6),
    });
    const value3 = CryptoJS.enc.Utf8.stringify(value4);
    const value2 = f_random(16);
    return (
        "id=" +
        CryptoJS.AES.encrypt(id, CryptoJS.enc.Utf8.parse(value1), {
            iv: CryptoJS.enc.Utf8.parse(value2),
        }).toString() +
        "&time=" +
        "00" +
        value2 +
        "00" +
        value3.substring(value3.indexOf("&"))
    );
};

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
