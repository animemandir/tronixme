import { Box, Container } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";
import ReactPlayer from "react-player";
import useSWR from "swr";

import { ApiEpisodeAnime } from "@types";

export default function AnimeEp() {
    const { anime, ep } = useRouter().query;
    const { data: links } = useSWR<ApiEpisodeAnime>(`/episode/${anime}/${ep}`);

    const url = useMemo(() => {
        const hq = links?.source.find(({ label }) => label === "1080 P")?.file;
        return hq || links?.source[links.source.length - 2].file;
    }, [links]);

    return (
        <Container maxWidth="xl">
            <Box position="relative" pt={1920 / 1080}>
                <ReactPlayer controls url={url} width="100%" height="100%" />
            </Box>
        </Container>
    );
}
