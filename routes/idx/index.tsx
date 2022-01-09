import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import Image from "next/image";
import useSWR from "swr";

import { APIRecently } from "@types";

export default function Index() {
    const { data = [] } = useSWR<APIRecently[]>("/recently/sub");

    return (
        <Container sx={{ my: 6 }}>
            <Paper variant="outlined" component={Stack} width="100%" p={2}>
                <Typography variant="h4" align="left" gutterBottom>
                    Recently updated
                </Typography>
                <Grid container spacing={6}>
                    {data.map(({ title, latest_ep, thumbnail }) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={`${title}${latest_ep}`}>
                            <Card sx={{ width: "100%" }}>
                                <CardActionArea>
                                    <CardMedia sx={{ height: 400 }}>
                                        <Box position="relative" width="100%" height="100%">
                                            <Image
                                                src={thumbnail}
                                                layout="fill"
                                                objectFit="cover" // or objectFit="cover"
                                            />
                                        </Box>
                                    </CardMedia>

                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            {title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {`Ep. ${latest_ep}`}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
}
