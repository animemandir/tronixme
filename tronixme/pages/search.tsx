import { search } from "animedao";
import { GetServerSideProps } from "next";
import Error from "next/error";
import { SWRConfig } from "swr";

import { PageProps } from "@types";

import { handleSSR } from "@utils";

import Search from "@routes/search";

export const getServerSideProps: GetServerSideProps = ({ query }) =>
    handleSSR(async () => {
        const { q } = query;

        const fallback = {
            [`/search?q=${q}`]: await search(String(q)),
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
