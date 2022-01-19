import { GetServerSideProps } from "next";
import Error from "next/error";
import { SWRConfig } from "swr";

import { PageProps } from "@types";

import { axiosSSR, handleSSR } from "@utils";

import Search from "@routes/search";

export const getServerSideProps: GetServerSideProps = ({ req, query }) =>
    handleSSR(async () => {
        const { host } = req.headers;
        const { q } = query;

        const { data: anime } = await axiosSSR(`/anime/search?q=${q}`, String(host));

        const fallback = {
            [`/anime/search?q=${q}`]: anime,
        };

        return { props: { fallback } };
    });

export default function Page({ fallback, error }: PageProps) {
    if (error) {
        return <Error title={error.data} statusCode={error.status as any} />;
    }

    return (
        <SWRConfig value={{ fallback }}>
            <Search />
        </SWRConfig>
    );
}
