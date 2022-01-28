import { Box, Container } from "@mui/material";

import { onServer } from "@utils";

export default function User() {
    return (
        <Container>
            <Box>{!onServer() && localStorage.getItem("activity")}</Box>
        </Container>
    );
}
