import cheerio from "cheerio";
import { GetServerSideProps } from "next";
import Error from "next/error";
import axios from "redaxios";
import { SWRConfig } from "swr";

import { AxiosEpisodeAnime, PageProps } from "@types";

import { BASE_URL, USER_AGENT } from "@config";

import { generateEncryptAjaxParameters, handleSSR } from "@utils";

import AnimeEp from "@routes/anime/[anime]/[ep]";

export const getServerSideProps: GetServerSideProps = ({ query }) =>
    handleSSR(async () => {
        const { anime, ep } = query;

        const { data: links } = await axios.get<AxiosEpisodeAnime[]>(
            `${BASE_URL}/episode/${anime}/${ep}`
        );

        const url = new URL(links[0].vidcdn);

        const { data: html } = await axios.get(url.href, {
            headers: {
                "User-Agent": USER_AGENT,
            },
        });

        const $ = cheerio.load(html);
        const params = generateEncryptAjaxParameters($, url.searchParams.get("id") || "");

        const { data: videos } = await axios.get(
            `${url.protocol}//${url.hostname}/encrypt-ajax.php?${params}`,
            {
                headers: {
                    "User-Agent": USER_AGENT,
                    Referrer: url.href,
                    "X-Requested-With": "XMLHttpRequest",
                },
            }
        );

        const fallback = {
            [`/episode/${anime}/${ep}`]: videos,
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
