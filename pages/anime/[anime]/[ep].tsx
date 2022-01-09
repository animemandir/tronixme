import { GetServerSideProps } from "next";
import Error from "next/error";
import { SWRConfig } from "swr";

import { ApiEpisodeAnime, PageProps } from "@types";

import { axiosSSR, handleSSR } from "@utils";

import AnimeEp from "@routes/anime/[anime]/[ep]";

export const getServerSideProps: GetServerSideProps = ({ req, query }) =>
    handleSSR(async () => {
        const { host } = req.headers;
        const { anime, ep } = query;

        const { data } = await axiosSSR<ApiEpisodeAnime>(
            `/episode/${anime}/${ep}`,
            host || ""
        );

        const fallback = {
            [`/episode/${anime}/${ep}`]: data,
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
