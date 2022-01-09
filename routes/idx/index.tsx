import { Box, Card, CardContent, Container, Grid, Paper, Typography } from "@mui/material";
import useSWR from "swr";

import { APIRecently } from "@types";

export default function Index() {
    const { data = [] } = useSWR<APIRecently[]>("/recently/sub");

    return (
        <Container sx={{ my: 6 }}>
            <Paper component={Box} width="100%">
                <Grid width="100%" container spacing={2}>
                    {data.map(({ title, latest_ep, thumbnail }) => (
                        <Grid item xs={6} md={4} key={`${title}${latest_ep}`}>
                            <Card sx={{ width: "100%" }}>
                                <CardContent>
                                    <Typography>{title}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
}
