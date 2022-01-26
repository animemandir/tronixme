import InfoIcon from "@mui/icons-material/Info";
import { Grid, Paper, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import type { AxiosRecent } from "animedao";
import useSWR from "swr";

import { AnimeCard } from "@components";

export default function Recent() {
    const { data = [] } = useSWR<AxiosRecent[]>("/recent");
    const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    return (
        <Stack component={Paper} width="100%" p={4}>
            <Stack flexDirection="row" justifyContent="flex-start" alignItems="center" mb={2}>
                <InfoIcon fontSize="large" />
                <Typography ml={0.5} variant={mobile ? "h6" : "h5"}>
                    Recently updated
                </Typography>
            </Stack>

            <Grid container spacing={4}>
                {data.map(({ anime, date, description, episode, hot, img, id, slug }) => (
                    <Grid item xs={12} sm={6} lg={4} key={id}>
                        <AnimeCard
                            url={`/anime/${slug}/${id}`}
                            slug={slug}
                            ep={episode}
                            thumbnail={img}
                            title={description}
                            date={date}
                            description={anime}
                            hot={hot}
                        />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
