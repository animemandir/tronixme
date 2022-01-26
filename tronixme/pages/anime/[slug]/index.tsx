import { getAnime } from "animedao";
import { GetServerSideProps } from "next";
import Error from "next/error";
import { SWRConfig } from "swr";

import { PageProps } from "@types";

import { handleSSR } from "@utils";

import Anime from "@routes/anime/[slug]/idx";

export const getServerSideProps: GetServerSideProps = ({ query }) =>
    handleSSR(async () => {
        const { slug } = query;

        const anime = await getAnime(String(slug));

        const fallback = {
            [`/anime/${slug}`]: anime,
        };

        return { props: { fallback } };
    });

export default function Page({ fallback, error }: PageProps) {
    if (error) {
        return <Error title={error.data} statusCode={error.status as any} />;
    }

    return (
        <SWRConfig value={{ fallback }}>
            <Anime />
        </SWRConfig>
    );
}
