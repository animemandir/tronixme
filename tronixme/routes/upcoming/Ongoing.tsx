import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import type { AxiosUpcoming } from "animedao";
import useSWR from "swr";

import { AnimeCard } from "@components";

export default function Ongoing() {
    const { data } = useSWR<AxiosUpcoming>("/upcoming");

    return (
        <Box component={Paper} p={4}>
            <Stack flexDirection="row" justifyContent="flex-start" alignItems="center" mb={2}>
                <PlaylistPlayIcon fontSize="large" />
                <Typography variant="h5" ml={0.5}>
                    All ongoing
                </Typography>
            </Stack>
            <Grid container spacing={4}>
                {data?.ongoing.map(({ alternative, img, title, when, slug }) => (
                    <Grid item xs={12} sm={6} lg={4} key={title}>
                        <AnimeCard
                            thumbnail={img}
                            title={title}
                            date={when}
                            description={alternative}
                            url={`/anime/${slug}`}
                            slug={slug}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
