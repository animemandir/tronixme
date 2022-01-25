import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { memo } from "react";

interface EpisodeProps {
    slug: string;
    id: string;
    description: string;
    name: string;
    date: string;
    selected?: boolean;
    variant?: "elevation" | "outlined";
}

export const Episode = memo(
    ({
        slug,
        id,
        description,
        name,
        date,
        selected = false,
        variant = "outlined",
    }: EpisodeProps) => {
        return (
            <Link key={id} href={`/anime/${slug}/${id}`} passHref>
                <Card component={CardActionArea} variant={variant}>
                    <CardContent>
                        <Typography fontWeight={900}>{name}</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {description}
                        </Typography>
                        <Typography align="right" variant="caption" component="p">
                            {date}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        );
    }
);
