import { Container, Grid } from "@mui/material";

import Activity from "./Activity";

export default function User() {
    return (
        <Container>
            <Grid container mt={4}>
                <Grid item xs={12}>
                    <Activity />
                </Grid>
            </Grid>
        </Container>
    );
}
