import { getUpcoming } from "animedao";
import { GetStaticProps } from "next";
import Error from "next/error";
import { SWRConfig } from "swr";

import { PageProps } from "@types";

import { handleSSR } from "@utils";

import Upcoming from "@routes/upcoming";

export const getStaticProps: GetStaticProps = () =>
    handleSSR(async () => {
        const upcoming = await getUpcoming();

        const fallback = {
            "/upcoming": upcoming,
        };

        return {
            props: { fallback },
            revalidate: 1 * 60 * 60 * 3,
        };
    });

export default function Page({ fallback, error }: PageProps) {
    if (error) {
        return <Error title={error.data} statusCode={error.status as any} />;
    }

    return (
        <SWRConfig value={{ fallback }}>
            <Upcoming />
        </SWRConfig>
    );
}
