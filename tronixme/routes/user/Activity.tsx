import { Box, Paper, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

import { onServer } from "@utils";

export default function Started() {
    const started = useMemo(() => {
        if (onServer()) return [];

        const started = localStorage.getItem("activity");
        if (!started) return [];

        const parsed = JSON.parse(started);

        return Object.keys(parsed).map(key => ({
            slug: key,
            id: parsed[key].id,
            ep: parsed[key].ep,
        }));
    }, []);

    return (
        <Stack component={Paper} p={2}>
            <Box>
                <Typography variant="h5">Recently watched</Typography>
            </Box>
            {started.map(({ ep, id, slug }) => (
                <Box key={id}>
                    ep: {ep}
                    id: {id}
                    slug: {slug}
                </Box>
            ))}
        </Stack>
    );
}
