import { getAnime, getEpisode } from "animedao";
import { GetServerSideProps } from "next";
import Error from "next/error";
import { SWRConfig } from "swr";

import { PageProps } from "@types";

import { handleSSR } from "@utils";

import Episode from "@routes/anime/[slug]/[id]";

export const getServerSideProps: GetServerSideProps = ({ query, req }) =>
    handleSSR(async () => {
        const { slug, id } = query;

        if (process.env.SECRET && req.cookies.secret !== process.env.SECRET) {
            throw {
                status: 403,
                data: "Forbidden",
            };
        }

        const [anime, episode] = await Promise.all([
            getAnime(String(slug)),
            getEpisode(String(id)),
        ]);

        const fallback = {
            [`/anime/${slug}`]: anime,
            [`/episode/${id}`]: episode,
        };

        return { props: { fallback } };
    });

export default function Page({ fallback, error }: PageProps) {
    if (error) {
        return <Error title={error.data} statusCode={error.status as any} />;
    }

    return (
        <SWRConfig value={{ fallback }}>
            <Episode />
        </SWRConfig>
    );
}
