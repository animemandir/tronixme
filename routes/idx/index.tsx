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
import useSWR from "swr";

import { ApiRecently } from "@types";

import { AnimeCard } from "@components";

export default function Index() {
    const { data = [] } = useSWR<ApiRecently[]>("/recently/sub");
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
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
                    {data.map(({ title, latest_ep, thumbnail, url }) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={`${title}${latest_ep}`}>
                            <AnimeCard
                                url={url}
                                ep={latest_ep}
                                thumbnail={thumbnail}
                                title={title}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
}
