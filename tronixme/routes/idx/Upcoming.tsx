import { Box, Chip, Divider, Paper, Stack, Typography, useTheme } from "@mui/material";
import type { Upcoming as UpcomingEpisodes } from "animedao";
import useSWR from "swr";

import { ResponsiveImage } from "@components";

export default function Upcoming() {
    const theme = useTheme();
    const { data = [] } = useSWR<UpcomingEpisodes[]>("/upcoming");

    return (
        <Stack component={Paper} p={2}>
            <Typography align="center" variant="h6" gutterBottom>
                Upcoming
            </Typography>

            <Stack>
                {data.map(({ alternative, img, title, when }) => (
                    <Box flex={1} key={title + alternative}>
                        <Divider textAlign="left">
                            <Chip label={when} />
                        </Divider>
                        <Stack flexDirection="row" my={4}>
                            <Box flex={1}>
                                <ResponsiveImage
                                    props={{
                                        borderRadius: `${theme.shape.borderRadius}px`,
                                        minHeight: 100,
                                    }}
                                    src={img}
                                />
                            </Box>

                            <Box width="70%" ml={2}>
                                <Typography
                                    color="text.secondary"
                                    variant="button"
                                    gutterBottom
                                >
                                    {title}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}
