import { Container } from "@mui/material";
import type { AxiosAnime } from "animedao";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import Episodes from "./Episodes";
import Info from "./Info";

export default function Anime() {
    const { slug } = useRouter().query;
    const { data } = useSWR<AxiosAnime>(slug ? `/anime/${slug}` : null);

    return (
        <Container maxWidth="xl" sx={{ my: 4 }}>
            <Head>
                <title>{data?.title}</title>
            </Head>

            <Info />
            <Episodes />
        </Container>
    );
}
