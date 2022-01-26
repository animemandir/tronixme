import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import type { AxiosUpcoming } from "animedao";
import useSWR from "swr";

import { AnimeCard } from "@components";

export default function UpcomingGrid() {
    const { data } = useSWR<AxiosUpcoming[]>("/upcoming");

    return (
        <Box component={Paper} p={4}>
            <Stack flexDirection="row" justifyContent="flex-start" alignItems="center" mb={2}>
                <WatchLaterIcon fontSize="large" />
                <Typography variant="h5" ml={0.5}>
                    Upcoming
                </Typography>
            </Stack>
            <Grid container spacing={2}>
                {data?.map(({ alternative, img, title, when }) => (
                    <Grid item xs={12} sm={6} lg={4} key={title}>
                        <AnimeCard
                            thumbnail={img}
                            title={title}
                            date={when}
                            description={alternative}
                            url=""
                            slug=""
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
