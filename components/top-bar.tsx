import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Box, Button, Container, InputBase, Stack, Toolbar } from "@mui/material";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";

export function TopBar() {
    const [search, setSearch] = useState("");

    const handleSearch = ({ key }: KeyboardEvent) => {
        if (key !== "Enter") return;
        Router.push(`/search?q=${encodeURIComponent(search)}`);
    };

    return (
        <AppBar position="relative">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Link href="/" passHref>
                        <Button LinkComponent="a" color="primary" startIcon={<HomeIcon />}>
                            Home
                        </Button>
                    </Link>
                    <Box flex={1} px={2} />
                    <Stack flexDirection="row" justifyContent="center" alignItems="center">
                        <SearchIcon />
                        <InputBase
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => handleSearch(e as any)}
                            sx={{ ml: 0.5 }}
                            placeholder="Search"
                        />
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
