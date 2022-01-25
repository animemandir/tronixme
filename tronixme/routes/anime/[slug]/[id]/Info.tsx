import { Paper, Stack, Typography } from "@mui/material";
import type { AxiosAnime } from "animedao";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Info() {
    const { slug } = useRouter().query;
    const { data } = useSWR<AxiosAnime>(`/anime/${slug}`);

    return (
        <Stack component={Paper}>
            <Typography align="center" my={2} variant="h6">
                {data?.title}
            </Typography>
        </Stack>
    );
}
