import { Box, Paper, Stack, Typography } from "@mui/material";
import type { AxiosAnime, AxiosEpisode } from "animedao";
import { useRouter } from "next/router";
import useSWR from "swr";

import { Episode } from "@components";

export default function Info() {
    const { slug, id } = useRouter().query;
    const { data: anime } = useSWR<AxiosAnime>(`/anime/${slug}`);
    const { data: ep } = useSWR<AxiosEpisode>(`/episode/${id}`);

    return (
        <Stack component={Paper} p={2} height="100%">
            <Typography align="center" my={2} variant="h6">
                {anime?.title}
            </Typography>

            <Stack overflow="auto" minHeight={300} maxHeight={400} flex={1}>
                {anime?.episodes.map((episode, i) => (
                    <Box key={episode.id} my={1}>
                        <Episode
                            {...episode}
                            key={episode.id}
                            slug={String(slug)}
                            selected={ep?.ep === 2}
                        />
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}
