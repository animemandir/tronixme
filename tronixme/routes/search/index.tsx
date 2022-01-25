import SearchIcon from "@mui/icons-material/Search";
import {
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import type { AxiosSearch } from "animedao";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import { AnimeCard } from "@components";

export default function Search() {
    const { q } = useRouter().query;
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { data = [] } = useSWR<AxiosSearch[]>(`/search?q=${q}`);

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
                    <SearchIcon fontSize="large" />
                    <Typography ml={0.5} variant={mobile ? "h6" : "h5"} align="left">
                        Searched {`"${q}"`}
                    </Typography>
                </Stack>

                <Grid container spacing={4}>
                    {data.map(({ alternative, img, slug, title, year }) => (
                        <Grid item xs={12} sm={6} key={slug}>
                            <AnimeCard
                                slug={slug}
                                thumbnail={img}
                                title={title}
                                date={year}
                                description={alternative}
                                url={`/anime/${slug}`}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
}
