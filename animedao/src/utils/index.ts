import CryptoJS from "crypto-js";
import type { CheerioAPI } from "cheerio";

export const between = (a: string, b: string, str: string) => {
    return str.slice(str.indexOf(a) + a.length, b ? str.indexOf(b) : str.length);
};

// credits to: https://github.com/MeemeeLab/node-anime-viewer
export const bypassGogo = ($: CheerioAPI, id: string) => {
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
