import { Box, Container, Grid, Paper } from "@mui/material";
import Head from "next/head";
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
        return hq || links?.source[Math.max(0, links.source.length - 2)].file;
    }, [links]);

    return (
        <Container maxWidth="xl" sx={{ my: 2 }}>
            <Head>
                <title>Tronixme - {anime}</title>
            </Head>
            <Grid container spacing={10}>
                <Grid item xs={12} md={10}>
                    <Box position="relative" pt={1920 / 1080}>
                        <ReactPlayer controls url={url} width="100%" height="100%" />
                    </Box>
                </Grid>
                <Grid item xs>
                    <Paper variant="outlined">{"TODO: anime info"}</Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
