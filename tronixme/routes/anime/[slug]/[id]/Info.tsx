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
        <Stack component={Paper} p={2} height="100%" overflow="hidden">
            <Typography align="center" my={2} variant="h6">
                {anime?.title}
            </Typography>

            <Stack overflow="auto" flex="1 1 300px">
                <Box>
                    {anime?.episodes.map((episode, i) => (
                        <Box minHeight={0} key={episode.id} my={2}>
                            <Episode
                                {...episode}
                                key={episode.id}
                                slug={String(slug)}
                                selected={ep?.ep === i + 1}
                            />
                        </Box>
                    ))}
                </Box>
            </Stack>
        </Stack>
    );
}
