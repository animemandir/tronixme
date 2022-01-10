import { GetServerSideProps } from "next";
import Error from "next/error";
import { scrapeUrl } from "pages/api/episode/[key]/[number]";
import { SWRConfig } from "swr";

import { PageProps } from "@types";

import { handleSSR } from "@utils";

import AnimeEp from "@routes/anime/[key]/[ep]";

export const getServerSideProps: GetServerSideProps = ({ query }) =>
    handleSSR(async () => {
        const { key, ep } = query;

        const fallback = {
            [`/episode/${key}/${ep}`]: await scrapeUrl(String(key), String(ep)),
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
