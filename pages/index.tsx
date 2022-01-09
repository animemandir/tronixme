import { GetServerSideProps } from "next";
import Error from "next/error";
import { SWRConfig } from "swr";

import { ApiRecently, PageProps } from "@types";

import { axiosSSR, handleSSR } from "@utils";

import Index from "@routes/idx";

export const getServerSideProps: GetServerSideProps = ({ req }) =>
    handleSSR(async () => {
        const { host } = req.headers;

        const { data } = await axiosSSR<ApiRecently>("/recently/sub", host || "");

        const fallback = {
            "/recently/sub": data,
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
            <Index />
        </SWRConfig>
    );
}
