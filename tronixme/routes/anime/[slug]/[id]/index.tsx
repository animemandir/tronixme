import { Container, Grid, Stack } from "@mui/material";

import Player from "./Player";

export default function Episode() {
    return (
        <Container maxWidth="xl">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Stack height={600}>
                        <Player />
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}
