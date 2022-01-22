import { Container } from "@mui/material";
import type { Anime as AxiosAnime } from "animedao";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Anime() {
    const { slug } = useRouter().query;
    const { data } = useSWR<AxiosAnime>(slug ? `/anime/${slug}` : null);

    return <Container maxWidth="lg">{JSON.stringify(data)}</Container>;
}
