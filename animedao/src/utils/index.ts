import axios from "redaxios";

export const between = (a: string, b: string, str: string) => {
    return str.slice(str.indexOf(a) + a.length, b ? str.indexOf(b) : str.length);
};

export const http = <T = any>(url: string): any => {
    return axios.get<T>(`https://proxy.tronikel-apps.com/?url=${encodeURIComponent(url)}`);
};
