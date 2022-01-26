import { Container, Grid } from "@mui/material";

import Ongoing from "./OngoinG";
import UpcomingGrid from "./UpcomingGrid";

export default function Upcoming() {
    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <UpcomingGrid />
                </Grid>
                <Grid item xs>
                    <Ongoing />
                </Grid>
            </Grid>
        </Container>
    );
}
