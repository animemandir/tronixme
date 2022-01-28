import { useTheme } from "@mui/material";
import { AxiosAnime, AxiosEpisode } from "animedao";
import { useRouter } from "next/router";
import Plyr, { PlyrInstance } from "plyr-react";
import "plyr-react/dist/plyr.css";
import { useMemo, useRef } from "react";
import useSWR from "swr/immutable";

import { useInterval } from "@hooks";

type PlyrRef = {
    plyr: PlyrInstance;
};

const updateTime = (slug: string, ms: number, ep = 0, id = "") => {
    let current = JSON.parse(localStorage.getItem("activity") || "{}");

    if (current?.[slug]) {
        current[slug] = {
            ms,
            ep,
            id,
        };
    } else {
        current = {
            ...current,
            [slug]: {
                ms,
                ep,
                id,
            },
        };
    }

    localStorage.setItem("activity", JSON.stringify(current));
};

export default function Player() {
    const { id, slug } = useRouter().query;

    const { data: episode } = useSWR<AxiosEpisode>(`/episode/${id}`);
    const { data: anime } = useSWR<AxiosAnime>(`/anime/${slug}`);
    const theme = useTheme();

    const plyrRef = useRef<PlyrRef>(null);

    const sources = useMemo(() => {
        if (!episode) return [];
        const { videos } = episode;
        // 1080p
        return videos.source.map(({ file, label }) => {
            const size = label.replace(/\D/g, "");
            return {
                src: file,
                size: Number(size) || undefined,
            } as any;
        });
    }, [episode]);

    useInterval(() => {
        if (!plyrRef.current?.plyr) return;
        if (!plyrRef.current.plyr.playing) return;
        updateTime(String(slug), plyrRef.current.plyr.currentTime, episode?.ep, String(id));
    }, 2000);

    return (
        <Plyr
            source={{
                type: "video",
                poster: anime?.img,
                title: anime?.title,
                sources,
            }}
            ref={plyrRef}
            style={{ ["--plyr-color-main" as any]: theme.palette.primary.main }}
        />
    );
}
