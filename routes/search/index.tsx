import InfoIcon from "@mui/icons-material/Info";
import {
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import { ApiRecently } from "@types";

import { AnimeCard } from "@components";

export default function Search() {
    const { q } = useRouter().query;

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { data = [] } = useSWR<ApiRecently[]>(`/anime/search?q=${q}`);

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Head>
                <title>{`"${q}"`}</title>
            </Head>
            <Paper component={Stack} width="100%" p={4}>
                <Stack
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    mb={1}
                >
                    <InfoIcon fontSize="large" />
                    <Typography ml={0.5} variant={mobile ? "h6" : "h5"} align="left">
                        Searched {`"${q}"`}
                    </Typography>
                </Stack>

                <Grid container spacing={4}>
                    {data.map(({ title, thumbnail, url }) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={`${title}`}>
                            <AnimeCard url={url} thumbnail={thumbnail} title={title} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
}
