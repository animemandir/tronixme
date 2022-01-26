import { Container, Grid } from "@mui/material";

import UpcomingGrid from "./UpcomingGrid";

export default function Upcoming() {
    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <UpcomingGrid />
                </Grid>
            </Grid>
        </Container>
    );
}
