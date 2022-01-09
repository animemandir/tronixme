import type { CheerioAPI } from "cheerio";
import CryptoJS from "crypto-es";
import axios from "redaxios";

const isDev = process.env.NODE_ENV !== "production";

export const handleSSR = async (fn: () => any) => {
    try {
        return await fn();
    } catch (error: any) {
        return {
            props: {
                error: {
                    status: JSON.stringify(error.status),
                    data: JSON.stringify(error.data),
                },
            },
        };
    }
};

export const onServer = () => typeof window === "undefined";

export const axiosSSR = <T>(url: string, host: string) => {
    const parsed = `${isDev ? "http://" : "https://"}${host}/api${url}`;
    return axios.get<T>(parsed);
};

export const handleError = (error: any) =>
    JSON.stringify(error.data || error.statusText || error.message || error);

// credits to: https://github.com/MeemeeLab/node-anime-viewer
export const generateEncryptAjaxParameters = ($: CheerioAPI, id: string) => {
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
