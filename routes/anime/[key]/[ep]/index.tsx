import InfoIcon from "@mui/icons-material/Info";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
    Box,
    Breadcrumbs,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import ReactPlayer from "react-player";
import useSWR from "swr";

import { APIAnime, ApiEpisodeAnime } from "@types";

const AnimeInfo = () => {
    const { key, ep } = useRouter().query;

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data: anime = [{}] } = useSWR<APIAnime[]>(`/anime/${key}`);

    const episodes = useMemo(() => {
        if (!anime[0].total_episodes) return [];
        return [...Array(Number(anime[0].total_episodes)).keys()].map(i => i + 1);
    }, [anime]);

    return (
        <Stack p={3} component={Paper} justifyContent="center" alignItems="center">
            <Grid direction="row" container spacing={3}>
                {!mobile && (
                    <Grid item sm={2} height={300}>
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
                )}

                <Grid item xs>
                    <Stack
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h6">{anime[0].animetitle}</Typography>
                        <Link href={`/anime/${key}`} passHref>
                            <Button
                                color="primary"
                                variant="contained"
                                startIcon={<InfoIcon />}
                            >
                                Anime page
                            </Button>
                        </Link>
                    </Stack>
                    <Divider sx={{ my: 2 }}>
                        <Chip label="Episodes" />
                    </Divider>
                    <Stack flexDirection="row" flexWrap="wrap">
                        {episodes.map(i => (
                            <Box m={1} key={i}>
                                <Link href={`/anime/${key}/${i}`} passHref>
                                    <Button
                                        LinkComponent="a"
                                        variant="contained"
                                        color={Number(ep) === i ? "primary" : "secondary"}
                                    >
                                        {i}
                                    </Button>
                                </Link>
                            </Box>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default function AnimeEp() {
    const { key, ep } = useRouter().query;

    const { data: links } = useSWR<ApiEpisodeAnime>(`/episode/${key}/${ep}`);
    const { data: anime = [{}] } = useSWR<APIAnime[]>(`/anime/${key}`);

    const url = useMemo(() => {
        const hq = links?.source.find(({ label }) => label === "1080 P")?.file;
        return hq || links?.source[Math.max(0, links.source.length - 2)].file;
    }, [links]);

    return (
        <Container maxWidth="lg" sx={{ my: 2 }}>
            <Head>
                <title>{anime[0].animetitle}</title>
            </Head>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Stack>
                        <Breadcrumbs separator={<NavigateNextIcon />}>
                            <Typography fontWeight={900}>{anime[0]?.animetitle}</Typography>
                            <Typography
                                fontWeight={900}
                            >{`${ep}/${anime[0]?.total_episodes}`}</Typography>
                        </Breadcrumbs>
                        <Box position="relative" pt={1920 / 1080}>
                            <ReactPlayer controls url={url} width="100%" height="100%" />
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs>
                    <AnimeInfo />
                </Grid>
            </Grid>
        </Container>
    );
}
