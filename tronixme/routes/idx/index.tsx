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
import type { RecentEpisodes } from "animedao";
import Head from "next/head";
import useSWR from "swr";

import { AnimeCard } from "@components";

export default function Index() {
    const { data = [] } = useSWR<RecentEpisodes[]>("/recent");
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Container maxWidth="xl" sx={{ my: 4 }}>
            <Head>
                <title>Tronixme - Home</title>
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
                        Recently updated
                    </Typography>
                </Stack>

                <Grid container spacing={4}>
                    {data.map(({ anime, date, description, episode, hot, img, id }) => (
                        <Grid item xs={12} sm={6} md={4} key={id}>
                            <AnimeCard
                                url={`/episode/${id}`}
                                ep={episode}
                                thumbnail={img}
                                title={anime}
                                date={date}
                                description={description}
                                hot={hot}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
}
