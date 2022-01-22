import { Box } from "@mui/material";
import type { AxiosVideos } from "animedao";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import useSWR from "swr/immutable";

export default function Player() {
    const { id } = useRouter().query;
    const { data } = useSWR<AxiosVideos>(id ? `/episode/${id}` : null);

    return (
        <Box position="relative" pt={1920 / 1080} height={400}>
            <ReactPlayer
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
                controls
                width="100%"
                height="100%"
                url={data?.source[data.source.length - 2].file}
            />
        </Box>
    );
}
