import { Autocomplete, Box, InputBase, Stack, Typography } from "@mui/material";
import type { AxiosSearch } from "animedao";
import Router from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

import { ResponsiveImage } from "@components";

export default function Search() {
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);

    const { data } = useSWR<AxiosSearch[]>(
        debouncedSearch ? `/search?q=${encodeURIComponent(debouncedSearch)}` : null
    );

    const onEnter = ({ key }: KeyboardEvent) => {
        if (key !== "Enter") return;
        Router.push(`/search?q=${encodeURIComponent(search)}`);
    };

    return (
        <Autocomplete
            sx={{ flex: 1 }}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            renderInput={({ InputProps, InputLabelProps, ...rest }) => (
                <InputBase {...InputProps} {...rest} placeholder="Search" />
            )}
            renderOption={(props, { title, year, img }) => (
                <Stack
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    component="li"
                    flexDirection="row"
                    {...props}
                >
                    <Box height={60} flex="1 1 30px">
                        <ResponsiveImage
                            props={{
                                borderRadius: theme => `${theme.shape.borderRadius}px`,
                                overflow: "hidden",
                            }}
                            src={img}
                        />
                    </Box>
                    <Box flex={7} ml={1}>
                        <Typography>{title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {year}
                        </Typography>
                    </Box>
                </Stack>
            )}
            filterOptions={x => x}
            options={data || []}
            getOptionLabel={anime => anime.title}
            inputValue={search}
            onInputChange={(_, value) => setSearch(value)}
            loading={!data && !!search}
            onKeyDown={e => onEnter(e as any)}
            onChange={(_, value) => {
                value?.slug && Router.push(`/anime/${value?.slug}`);
            }}
        />
    );
}
