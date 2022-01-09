import { AppBar, Toolbar, Typography } from "@mui/material";

export function TopBar() {
    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography>Home</Typography>
                <Typography>Recently updated</Typography>
            </Toolbar>
        </AppBar>
    );
}
