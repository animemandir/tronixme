import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "redaxios";

import { APIEpisodeAnime } from "@types";

export default function Index() {
    const [url, setUrl] = useState<string | undefined>(undefined);
    useEffect(() => {
        axios
            .get<APIEpisodeAnime>("/api/episode/komi-san-wa-comyushou-desu/1")
            .then(({ data }) => {
                const url =
                    data.source.find(({ label }) => label === "1080 P")?.file ||
                    data.source[0].file;
                setUrl(url);
            });
    }, []);

    return <ReactPlayer controls url={url} />;
}
