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
