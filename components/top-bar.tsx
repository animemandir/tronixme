import HomeIcon from "@mui/icons-material/Home";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import Link from "next/link";

export function TopBar() {
    return (
        <AppBar position="relative">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Link href="/" passHref>
                        <Button LinkComponent="a" color="primary" startIcon={<HomeIcon />}>
                            Home
                        </Button>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
