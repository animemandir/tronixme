import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import type { Anime as AxiosAnime } from "animedao";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Episodes() {
    const { slug } = useRouter().query;
    const { data } = useSWR<AxiosAnime>(slug ? `/anime/${slug}` : null);

    return (
        <Stack mt={2} component={Paper} p={2}>
            <Typography gutterBottom align="center" variant="h6">
                {data?.next}
            </Typography>

            <Grid container spacing={3}>
                {data?.episodes.reverse().map(({ date, id, name, description }) => (
                    <Grid item xs={12} sm={6} md={4} key={id}>
                        <Link key={id} href={`/anime/${slug}/${id}`} passHref>
                            <Card component={CardActionArea} variant="outlined">
                                <CardContent>
                                    <Typography fontWeight={900}>{name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {description}
                                    </Typography>
                                    <Typography align="right" variant="caption" component="p">
                                        {date}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
