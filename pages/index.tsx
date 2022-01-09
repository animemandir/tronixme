import { GetStaticProps } from "next";
import Error from "next/error";
import axios from "redaxios";
import { SWRConfig } from "swr";

import { PageProps } from "@types";

import { BASE_URL } from "@config";

import { handleSSR } from "@utils";

import Index from "@routes/idx";

export const getStaticProps: GetStaticProps = () =>
    handleSSR(async () => {
        const { data } = await axios.get(`${BASE_URL}/RecentlyUpdated/sub`);

        const fallback = {
            "/recently/sub": data,
        };

        return {
            props: { fallback },
            revalidate: 1 * 60 * 60 * 1,
        };
    });

export default function Page({ fallback, error }: PageProps) {
    if (error) {
        return <Error title={error.data} statusCode={error.status as any} />;
    }

    return (
        <SWRConfig value={{ fallback }}>
            <Index />
        </SWRConfig>
    );
}
