import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Paper,
    Rating,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import type { Anime as AxiosAnime } from "animedao";
import Link from "next/link";
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
                <Grid item xs={12} md={3} minHeight={500}>
                    {data?.img && (
                        <ResponsiveImage
                            props={{
                                overflow: "hidden",
                                flex: 1,
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

                    <Typography>
                        <Typography component="span">Rating: </Typography>
                        <Typography color="text.secondary" component="span" variant="body2">
                            {data?.rating}
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
                            <Stack>
                                {(
                                    Object.keys(data.relations || {}) as any as Array<
                                        keyof typeof data.relations
                                    >
                                ).map(key => (
                                    <Box key={key} flex={1} my={1}>
                                        <Link
                                            href={`/anime/${data.relations[key]?.slug}`}
                                            passHref
                                        >
                                            <Card
                                                variant="outlined"
                                                component={CardActionArea}
                                                sx={{
                                                    display: "flex",
                                                }}
                                            >
                                                <CardMedia sx={{ flex: 1, height: 100 }}>
                                                    <ResponsiveImage
                                                        src={data.relations[key]?.img || ""}
                                                    />
                                                </CardMedia>
                                                <CardContent sx={{ flex: 6 }}>
                                                    <Typography>
                                                        {key.toUpperCase()}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {data.relations[key]?.title}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
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
