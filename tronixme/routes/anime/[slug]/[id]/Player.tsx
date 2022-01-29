import { useTheme } from "@mui/material";
import { AxiosAnime, AxiosEpisode } from "animedao";
import { useRouter } from "next/router";
import Plyr, { PlyrInstance } from "plyr-react";
import "plyr-react/dist/plyr.css";
import { useEffect, useMemo, useRef } from "react";
import useSWR from "swr/immutable";

import { useInterval, useRefCallback } from "@hooks";

import { onServer } from "@utils";

type PlyrRef = {
    plyr: PlyrInstance;
};

const updateTime = (slug: string, sec: number, ep = 0, id = "") => {
    let current = JSON.parse(localStorage.getItem("activity") || "{}");

    if (current?.[slug]) {
        current[slug] = {
            sec,
            ep,
            id,
        };
    } else {
        current = {
            ...current,
            [slug]: {
                sec,
                ep,
                id,
            },
        };
    }

    localStorage.setItem("activity", JSON.stringify(current));
};

export default function Player() {
    const { id, slug } = useRouter().query;
    const theme = useTheme();

    const { data: episode } = useSWR<AxiosEpisode>(`/episode/${id}`);
    const { data: anime } = useSWR<AxiosAnime>(`/anime/${slug}`);

    const sources = useMemo(() => {
        if (!episode) return [];
        const { videos } = episode;
        // 1080p
        return videos.source.map(({ file, label }) => {
            const size = label.replace(/[^0-9.,]+/g, "");
            return {
                src: file,
                size: Number(size) || undefined,
            } as any;
        });
    }, [episode]);

    const [plyrRefCallback, plyrRef] = useRefCallback<PlyrRef>(({ plyr }) => {
        if (onServer()) return;

        const activity = JSON.parse(localStorage.getItem("activity") || "{}")[String(slug)];
        if (activity && activity.ep === episode?.ep && plyr.on) {
            plyr.on("loadeddata", () => {
                // why does this forward 2x seconds?
                plyr.forward(activity.sec / 2);
            });
        }
    });

    useInterval(() => {
        if (!plyrRef.current?.plyr) return;
        if (!plyrRef.current.plyr.playing) return;
        updateTime(String(slug), plyrRef.current.plyr.currentTime, episode?.ep, String(id));
    }, 1000);

    return (
        <Plyr
            source={{
                type: "video",
                poster: anime?.img,
                title: anime?.title,
                sources,
            }}
            ref={plyrRefCallback}
            style={{ ["--plyr-color-main" as any]: theme.palette.primary.main }}
        />
    );
}
