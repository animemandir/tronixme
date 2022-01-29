import TimelapseIcon from "@mui/icons-material/Timelapse";
import {
    Avatar,
    CircularProgress,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { AxiosAnime } from "animedao";
import Router from "next/router";
import { useMemo } from "react";
import useSWR from "swr";

import { ResponsiveImage } from "@components";

import { onServer } from "@utils";

interface ViewedProps {
    ep: number;
    id: string;
    slug: string;
    sec: number;
}

const Viewed = ({ ep, slug, sec }: ViewedProps) => {
    const { data } = useSWR<AxiosAnime>(`/anime/${slug}`);

    const progress = useMemo(() => Math.round((sec / (23 * 60)) * 100), [sec]);

    const onClick = () => {
        Router.push(`/anime/${slug}`);
    };

    if (!data) {
        return (
            <ListItem>
                <CircularProgress />
            </ListItem>
        );
    }

    return (
        <ListItemButton onClick={onClick}>
            <ListItemAvatar>
                <Avatar>{data?.img && <ResponsiveImage src={data.img} />}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`${data?.title} - ${ep}`}
                secondary={<LinearProgress variant="determinate" value={progress} />}
            />
        </ListItemButton>
    );
};

export default function Started() {
    const started = useMemo(() => {
        if (onServer()) return [];

        const started = localStorage.getItem("activity");
        if (!started) return [];

        const parsed = JSON.parse(started);

        return Object.keys(parsed)
            .map(key => ({
                slug: key,
                id: parsed[key].id,
                ep: parsed[key].ep,
                sec: parsed[key].sec,
            }))
            .reverse();
    }, []);

    return (
        <Stack component={Paper} p={2}>
            <Stack flexDirection="row" justifyContent="flex-start" alignItems="center">
                <TimelapseIcon fontSize="large" />
                <Typography ml={1} variant="h5">
                    Recently watched
                </Typography>
            </Stack>
            <List sx={{ flex: 1 }}>
                {started.map(props => (
                    // eslint-disable-next-line react/prop-types
                    <Viewed {...props} key={props.id} />
                ))}
            </List>
        </Stack>
    );
}
