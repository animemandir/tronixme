import {
    Badge,
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
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
            <Badge invisible={!hot} badgeContent={"Hot"} sx={{ width: "100%" }} color="error">
                <Card sx={{ width: "100%", display: "flex" }} variant="outlined">
                    <CardMedia sx={{ width: 100, height: 150 }}>
                        <Box position="relative" width="100%" height="100%">
                            <Image src={thumbnail} layout="fill" objectFit="cover" />
                        </Box>
                    </CardMedia>

                    <CardContent sx={{ flex: 1 }}>
                        <Typography gutterBottom>{title}</Typography>
                        <Typography
                            textOverflow="ellipsis"
                            fontSize="80%"
                            variant="body2"
                            color="text.secondary"
                        >
                            {description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {/\d/.test(ep) && `Ep. ${ep}`}
                        </Typography>
                    </CardContent>
                </Card>
            </Badge>
        );
    }
);
