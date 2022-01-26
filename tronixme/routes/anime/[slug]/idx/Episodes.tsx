import { Grid, Paper, Stack, Typography } from "@mui/material";
import type { AxiosAnime } from "animedao";
import { useRouter } from "next/router";
import useSWR from "swr";

import { Episode } from "@components";

export default function Episodes() {
    const { slug } = useRouter().query;
    const { data } = useSWR<AxiosAnime>(`/anime/${slug}`);

    return (
        <Stack mt={2} component={Paper} p={2}>
            <Typography gutterBottom align="center" variant="h6">
                {data?.next}
            </Typography>

            <Grid container spacing={3}>
                {data?.episodes.map(episode => (
                    <Grid item xs={12} sm={6} md={4} key={episode.id}>
                        <Episode {...episode} slug={String(slug)} />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
