import { Container, Grid } from "@mui/material";
import Head from "next/head";

import Recent from "./Recent";
import Upcoming from "./Upcoming";

export default function Index() {
    return (
        <Container maxWidth="xl" sx={{ my: 4 }}>
            <Head>
                <title>Tronixme - Home</title>
            </Head>

            <Grid container spacing={4}>
                <Grid item xs={12} lg={9}>
                    <Recent />
                </Grid>
                <Grid item xs>
                    <Upcoming />
                </Grid>
            </Grid>
        </Container>
    );
}
