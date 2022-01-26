import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import {
    AppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Theme,
    Toolbar,
    alpha,
    useMediaQuery,
} from "@mui/material";
import dynamic from "next/dynamic";
import Router from "next/router";
import { useState } from "react";

const Search = dynamic(() => import("./Search"));

const pages = [
    {
        title: "Home",
        url: "/",
        icon: <HomeIcon />,
    },
    {
        title: "Upcoming",
        url: "/upcoming",
        icon: <WatchLaterIcon />,
    },
];

export function Topbar() {
    const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    const [open, setOpen] = useState(false);

    const navigate = (page: string) => {
        setOpen(false);
        Router.push(`/${page}`);
    };

    return (
        <AppBar position="relative">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box flex={0.2} sx={{ display: mobile ? "flex" : "none" }}>
                        <IconButton onClick={() => setOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
                            <List sx={{ width: "60vw", minWidth: 200 }}>
                                {pages.map(({ icon, title, url }) => (
                                    <ListItem button key={title} onClick={() => navigate(url)}>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                    </Box>
                    <Box flex={1} sx={{ display: mobile ? "none" : "flex" }}>
                        <Stack flexDirection="row" flex={1}>
                            {pages.map(({ icon, title, url }) => (
                                <Button
                                    sx={{ mr: 1 }}
                                    onClick={() => navigate(url)}
                                    key={title}
                                    startIcon={icon}
                                >
                                    {title}
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                    <Stack
                        sx={{ bgcolor: theme => alpha(theme.palette.common.white, 0.15) }}
                        flex={mobile ? 1 : 0.3}
                        minWidth={200}
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        borderRadius={theme => theme.shape.borderRadius}
                    >
                        <SearchIcon sx={{ ml: 1 }} />
                        <Search />
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
