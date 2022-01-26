import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import Cookie from "js-cookie";
import Router from "next/router";
import { useRef } from "react";

export default function Auth() {
    const inputRef = useRef<HTMLInputElement>();

    const onSubmit = () => {
        if (!inputRef.current) return;

        const { value: secret } = inputRef.current;
        const secure = window.location.hostname !== "localhost";

        Cookie.set("secret", secret, { expires: 999999, secure });
        Router.replace("/");
    };

    return (
        <Container component={Stack} justifyContent="center" alignItems="center" mt={4}>
            <Stack component={Paper} p={4} justifyContent="center" alignItems="flex-start">
                <Typography gutterBottom variant="h6">
                    Input secret key here:
                </Typography>
                <TextField inputRef={inputRef} label="Secret" fullWidth />

                <Stack justifyContent="flex-end" alignItems="flex-end" width="100%" mt={1}>
                    <Button onClick={() => onSubmit()} variant="contained">
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}
