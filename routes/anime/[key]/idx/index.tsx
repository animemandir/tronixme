import { Box, Chip, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import useSWR from "swr";

import { APIAnime } from "@types";

export default function AnimeIndex() {
    const { key } = useRouter().query;
    const { data: anime = [{}] } = useSWR<APIAnime[]>(`/anime/${key}`);

    const genres = useMemo(() => {
        if (!anime[0].anime_genre) return [];
        return anime[0].anime_genre.split(",");
    }, [anime]);

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Head>
                <title>{anime[0].animetitle}</title>
            </Head>
            <Stack p={2} component={Paper} justifyContent="center" alignItems="center">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} height={500}>
                        <Box position="relative" width="100%" height="100%">
                            {anime[0].thumbnail && (
                                <Image
                                    src={anime[0].thumbnail}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" gutterBottom>
                            {anime[0].animetitle}
                        </Typography>

                        <Typography>
                            <Typography component="span">Alternative: </Typography>
                            <Typography
                                color="text.secondary"
                                component="span"
                                variant="body2"
                            >
                                {anime[0].alternate_titles}
                            </Typography>
                        </Typography>

                        <Typography>
                            <Typography component="span">Year: </Typography>
                            <Typography
                                color="text.secondary"
                                component="span"
                                variant="body2"
                            >
                                {anime[0].anime_year}
                            </Typography>
                        </Typography>

                        <Typography>
                            <Typography component="span">Status: </Typography>
                            <Typography
                                color="text.secondary"
                                component="span"
                                variant="body2"
                            >
                                {anime[0].anime_status}
                            </Typography>
                        </Typography>

                        <Stack flexDirection="row" flexWrap="wrap" alignItems="center" my={2}>
                            <Typography mr={0.5}>Genres:</Typography>
                            {genres.map(genre => (
                                <Chip sx={{ m: 0.5 }} key={genre} label={genre} />
                            ))}
                        </Stack>

                        <Typography>
                            <Typography component="span">Description: </Typography>
                            <Typography
                                color="text.secondary"
                                component="span"
                                variant="body2"
                            >
                                {anime[0].anime_summary}
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
}
