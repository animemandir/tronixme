import { InputBase } from "@mui/material";
import Router from "next/router";
import { useState } from "react";

export default function Search() {
    const [search, setSearch] = useState("");

    const handleSearch = ({ key }: KeyboardEvent) => {
        if (key !== "Enter") return;
        Router.push(`/search?q=${encodeURIComponent(search)}`);
    };

    return (
        <InputBase
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => handleSearch(e as any)}
            sx={{ ml: 0.5 }}
            placeholder="Search"
        />
    );
}
