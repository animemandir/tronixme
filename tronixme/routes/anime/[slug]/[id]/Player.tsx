import { Box, Paper, Stack } from "@mui/material";
import type { AxiosEpisode } from "animedao";
import { useRouter } from "next/router";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import { useMemo } from "react";
import useSWR from "swr/immutable";

export default function Player() {
    const { id } = useRouter().query;
    const { data } = useSWR<AxiosEpisode>(id ? `/episode/${id}` : null);

    const sources = useMemo(() => {
        if (!data) return [];
        const { videos } = data;
        // 1080p
        return videos.source.map(({ file, label }) => {
            const size = label.replace(/\D/g, "");
            return {
                src: file,
                size: size || undefined,
            } as any;
        });
    }, [data]);

    return (
        <Plyr
            source={{
                type: "video",
                sources,
            }}
        />
    );
}
