import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Container, Grid, Link as MuiLink, Stack } from "@mui/material";
import { AxiosAnime, AxiosEpisode } from "animedao";
import NextLink from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import Info from "./Info";
import Player from "./Player";

export default function Episode() {
    const { slug, id } = useRouter().query;
    const { data: anime } = useSWR<AxiosAnime>(`/anime/${slug}`);
    const { data: episode } = useSWR<AxiosEpisode>(`/episode/${id}`);

    return (
        <Container component={Stack} maxWidth="xl" sx={{ my: 4 }}>
            <Breadcrumbs separator={<NavigateNextIcon />}>
                <NextLink href="/" passHref>
                    <MuiLink color="inherit" underline="none">
                        Home
                    </MuiLink>
                </NextLink>
                <NextLink href={`/anime/${slug}`} passHref>
                    <MuiLink color="inherit" underline="none">
                        {anime?.title}
                    </MuiLink>
                </NextLink>
                <MuiLink color="inherit" underline="none">
                    {episode?.ep}
                </MuiLink>
            </Breadcrumbs>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} lg={9}>
                    <Stack height={600}>
                        <Player />
                    </Stack>
                </Grid>
                <Grid item xs>
                    <Info />
                </Grid>
            </Grid>
        </Container>
    );
}
