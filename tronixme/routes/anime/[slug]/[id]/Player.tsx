import { Box, Paper, Stack } from "@mui/material";
import type { AxiosEpisode } from "animedao";
import { useRouter } from "next/router";
import { useMemo } from "react";
import ReactPlayer from "react-player";
import useSWR from "swr/immutable";

export default function Player() {
    const { id } = useRouter().query;
    const { data } = useSWR<AxiosEpisode>(id ? `/episode/${id}` : null);

    const url = useMemo(() => {
        if (!data) return;
        const { videos } = data;
        // 1080p
        return videos.source[videos.source.length - 2].file;
    }, [data]);

    return (
        <Stack component={Paper} p={2} flex={1}>
            <Box position="relative" flex={1}>
                <ReactPlayer
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                    controls
                    width="100%"
                    height="100%"
                    url={url}
                />
            </Box>
        </Stack>
    );
}
