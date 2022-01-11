import { GetServerSideProps } from "next";
import Error from "next/error";
import { scrapeUrl } from "pages/api/episode/[key]/[number]";
import { SWRConfig } from "swr";

import { PageProps } from "@types";

import { axiosSSR, handleSSR } from "@utils";

import AnimeEp from "@routes/anime/[key]/[ep]";

export const getServerSideProps: GetServerSideProps = ({ query, req }) =>
    handleSSR(async () => {
        const { host } = req.headers;
        const { key, ep } = query;

        const [{ data: anime }, urls] = await Promise.all([
            axiosSSR(`/anime/${key}`, String(host)),
            scrapeUrl(String(key), String(ep)),
        ]);

        const fallback = {
            [`/anime/${key}`]: anime,
            [`/episode/${key}/${ep}`]: urls,
        };

        return {
            props: { fallback },
        };
    });

export default function Page({ fallback, error }: PageProps) {
    if (error) {
        return <Error title={error.data} statusCode={error.status as any} />;
    }

    return (
        <SWRConfig value={{ fallback }}>
            <AnimeEp />
        </SWRConfig>
    );
}
