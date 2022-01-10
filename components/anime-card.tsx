import {
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

interface AnimeCardProps {
    title: string;
    ep?: string;
    thumbnail: string;
    url: string;
}

export function AnimeCard({ ep = "", thumbnail, title, url }: AnimeCardProps) {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Card sx={{ width: "100%" }} variant="outlined">
            <Link passHref href={`${url}/${ep}`}>
                <CardActionArea
                    LinkComponent="a"
                    sx={{
                        display: "flex",
                        flexDirection: mobile ? "row" : "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        width: "100%",
                    }}
                >
                    <CardMedia sx={{ height: mobile ? 200 : 400, width: mobile ? 125 : 300 }}>
                        <Box position="relative" width="100%" height="100%">
                            <Image src={thumbnail} layout="fill" objectFit="cover" />
                        </Box>
                    </CardMedia>

                    <CardContent sx={{ flex: 1 }}>
                        <Typography gutterBottom>{title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {ep && `Ep. ${ep}`}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
}
