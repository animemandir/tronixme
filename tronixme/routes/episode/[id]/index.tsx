import { Container } from "@mui/material";
import { useRouter } from "next/router";

import Player from "./Player";

export default function Episode() {
    const { id } = useRouter().query;
    return (
        <Container maxWidth="lg">
            <Player />
        </Container>
    );
}
