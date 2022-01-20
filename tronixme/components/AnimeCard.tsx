import {
    Badge,
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface AnimeCardProps {
    title: string;
    ep?: string;
    thumbnail: string;
    url: string;
    date: string;
    description: string;
    hot: boolean;
}

export const AnimeCard = memo(
    ({ ep = "", thumbnail, title, url, date, description, hot }: AnimeCardProps) => {
        const theme = useTheme();
        const mobile = useMediaQuery(theme.breakpoints.down("sm"));

        return (
            <Card sx={{ width: "100%", display: "flex", p: 3 }} variant="outlined">
                <CardMedia sx={{ flex: 1 }}>
                    <Box
                        borderRadius={Number(theme.shape.borderRadius) - 14}
                        overflow="hidden"
                        position="relative"
                        width="100%"
                        height="100%"
                    >
                        <Image src={thumbnail} layout="fill" objectFit="cover" />
                    </Box>
                </CardMedia>

                <CardContent sx={{ width: "70%", display: "flex", flexDirection: "column" }}>
                    <Typography
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        gutterBottom
                    >
                        {description}
                    </Typography>
                    <Stack flexDirection="row" flexWrap="wrap">
                        {/\d/.test(ep) && (
                            <Chip sx={{ m: 0.5 }} color="info" label={`Ep. ${ep}`} />
                        )}
                        {hot && <Chip sx={{ m: 0.5 }} label="Hot" color="error" />}
                        <Chip sx={{ m: 0.5 }} label={date} />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
);
