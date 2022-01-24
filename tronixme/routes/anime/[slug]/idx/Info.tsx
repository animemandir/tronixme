import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Grid,
    Paper,
    Rating,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import type { Anime as AxiosAnime } from "animedao";
import { useRouter } from "next/router";
import useSWR from "swr";

import { ResponsiveImage } from "@components";

export default function Info() {
    const { slug } = useRouter().query;
    const { data } = useSWR<AxiosAnime>(slug ? `/anime/${slug}` : null);
    const theme = useTheme();

    return (
        <Stack p={2} component={Paper} justifyContent="center" alignItems="center">
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} height={500}>
                    {data?.img && (
                        <ResponsiveImage
                            props={{
                                overflow: "hidden",
                                borderRadius: `${theme.shape.borderRadius}px`,
                            }}
                            src={data.img}
                        />
                    )}
                </Grid>
                <Grid item xs>
                    <Typography variant="h5" gutterBottom>
                        {data?.title}
                    </Typography>

                    <Rating value={Number(data?.score) / (1 / 0.5)} precision={0.5} readOnly />

                    <Typography>
                        <Typography component="span">Alternative: </Typography>
                        <Typography color="text.secondary" component="span" variant="body2">
                            {data?.alternative}
                        </Typography>
                    </Typography>

                    <Typography>
                        <Typography component="span">Year: </Typography>
                        <Typography color="text.secondary" component="span" variant="body2">
                            {data?.year}
                        </Typography>
                    </Typography>

                    <Typography>
                        <Typography component="span">Status: </Typography>
                        <Typography color="text.secondary" component="span" variant="body2">
                            {data?.status}
                        </Typography>
                    </Typography>

                    <Stack flexDirection="row" flexWrap="wrap" alignItems="center" my={2}>
                        <Typography mr={0.5}>Genres:</Typography>
                        {data?.genres.map(genre => (
                            <Chip sx={{ m: 0.5 }} key={genre} label={genre} />
                        ))}
                    </Stack>

                    <Typography>
                        <Typography component="span">Description: </Typography>
                        <Typography color="text.secondary" component="span" variant="body2">
                            {data?.description}
                        </Typography>
                    </Typography>

                    {data?.relations && JSON.stringify(data?.relations) !== "{}" && (
                        <Stack>
                            <Typography mt={2} gutterBottom>
                                Relations:
                            </Typography>
                            <Stack flexDirection="row">
                                {(
                                    Object.keys(data.relations || {}) as any as Array<
                                        keyof typeof data.relations
                                    >
                                ).map(key => (
                                    <Box key={key}>
                                        <Card variant="outlined" component={CardActionArea}>
                                            <CardContent
                                                sx={{
                                                    display: "flex",
                                                    height: "100%",
                                                    width: "100%",
                                                }}
                                            >
                                                <Box>
                                                    <Typography variant="body2">
                                                        {key.toUpperCase()}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {data.relations[key]?.title}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                ))}
                            </Stack>
                        </Stack>
                    )}
                </Grid>
            </Grid>
        </Stack>
    );
}
