import { GetServerSideProps } from "next";
import Error from "next/error";
import { SWRConfig } from "swr";

import { PageProps } from "@types";

import { axiosSSR, handleSSR } from "@utils";

import AnimeIndex from "@routes/anime/[key]/idx";

export const getServerSideProps: GetServerSideProps = ({ req, query }) =>
    handleSSR(async () => {
        const { host } = req.headers;
        const { key } = query;

        const { data: anime } = await axiosSSR(`/anime/${key}`, String(host));

        const fallback = {
            [`/anime/${key}`]: anime,
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
            <AnimeIndex />
        </SWRConfig>
    );
}
