import { Button, Chip, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import type { Anime as AxiosAnime } from "animedao";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import { ResponsiveImage } from "@components";

export default function Anime() {
    const { slug } = useRouter().query;
    const { data } = useSWR<AxiosAnime>(slug ? `/anime/${slug}` : null);

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Head>
                <title>{data?.title}</title>
            </Head>
            <Stack p={2} component={Paper} justifyContent="center" alignItems="center">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} height={500}>
                        {data?.img && <ResponsiveImage src={data.img} />}
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" gutterBottom>
                            {data?.title}
                        </Typography>

                        <Typography>
                            <Typography component="span">Alternative: </Typography>
                            <Typography
                                color="text.secondary"
                                component="span"
                                variant="body2"
                            >
                                {data?.alternative}
                            </Typography>
                        </Typography>

                        <Typography>
                            <Typography component="span">Year: </Typography>
                            <Typography
                                color="text.secondary"
                                component="span"
                                variant="body2"
                            >
                                {data?.year}
                            </Typography>
                        </Typography>

                        <Typography>
                            <Typography component="span">Status: </Typography>
                            <Typography
                                color="text.secondary"
                                component="span"
                                variant="body2"
                            >
                                {data?.status}
                            </Typography>
                        </Typography>

                        <Stack flexDirection="row" flexWrap="wrap" alignItems="center" my={2}>
                            <Typography mr={0.5}>Genres:</Typography>
                            {data?.genres.map(genre => (
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
                                {data?.description}
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </Stack>

            <Stack mt={2} component={Paper} p={2}>
                <Typography variant="h6" ml={1}>
                    Episodes:{" "}
                </Typography>
                <Stack flexDirection="row" flexWrap="wrap">
                    {data?.episodes.map(({ date, id, name }, i) => (
                        <Link key={id} href={`/anime/${slug}/${id}`} passHref>
                            <Button sx={{ m: 1 }} LinkComponent="a" variant="contained">
                                {i + 1}
                            </Button>
                        </Link>
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
}
