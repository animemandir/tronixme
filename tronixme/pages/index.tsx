import { recent as getRecent, upcoming as getUpcoming } from "animedao";
import { GetStaticProps } from "next";
import Error from "next/error";
import { SWRConfig } from "swr";

import { PageProps } from "@types";

import { handleSSR } from "@utils";

import Index from "@routes/idx";

export const getStaticProps: GetStaticProps = () =>
    handleSSR(async () => {
        const [recent, upcoming] = await Promise.all([getRecent(), getUpcoming()]);

        const fallback = {
            "/recent": recent,
            "/upcoming": upcoming,
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
